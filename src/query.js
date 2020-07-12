global.fetch = require('node-fetch');

import axios from 'axios';
import { GraphQLClient } from 'graphql-request';

const parseShopifyType = (id) => id.split('/')[3];
const parseParentChild = (data, attributes) => {
  const result = [];

  data
    .split('\n')
    .filter((x) => x)
    .forEach((x) => {
      const object = JSON.parse(x);

      // eslint-disable-next-line no-underscore-dangle
      if (!object.__parentId) {
        const children = {};

        Object.values(attributes).forEach((attr) => (children[attr] = []));
        result.push({
          ...object,
          ...children
        });
        return;
      }

      // eslint-disable-next-line no-underscore-dangle
      const parent = result.find((obj) => obj.id === object.__parentId);

      if (parent) {
        const type = parseShopifyType(object.id);

        if (attributes[type]) {
          parent[attributes[type]].push(object);
          return;
        }

        return;
      }
    });

  return result;
};

const createRequest = async (client, query, reporter) => {
  const queryText = `
  mutation {
    bulkOperationRunQuery(
     query: """
      ${query}
      """
    ) {
      bulkOperation {
        id
        status
      }
      userErrors {
        field
        message
      }
    }
  }`;

  try {
    const {
      data: { bulkOperationRunQuery }
    } = await client.rawRequest(queryText);

    return bulkOperationRunQuery;
  } catch (error) {
    reporter.panicOnBuild(error);
  }
};

const pollRequest = async (client, reporter) => {
  const queryText = `
  query {
    currentBulkOperation {
      id
      status
      errorCode
      createdAt
      completedAt
      objectCount
      fileSize
      url
      partialDataUrl
    }
  }`;

  try {
    const {
      data: { currentBulkOperation }
    } = await client.rawRequest(queryText);

    return currentBulkOperation;
  } catch (error) {
    reporter.panicOnBuild(error);
  }
};

export const createQuery = async (query, types, options, reporter) => {
  const { shopName, apiPassword } = options;
  const url = `https://${shopName}.myshopify.com/admin/api/2020-07/graphql.json`;
  const client = new GraphQLClient(url, {
    headers: {
      'X-Shopify-Access-Token': apiPassword
    }
  });
  const creationResult = await createRequest(client, query, reporter);

  reporter.info(
    `Query creation status is ${creationResult.bulkOperation.status}`
  );

  if (creationResult.bulkOperation.status !== 'CREATED') {
    return null;
  }

  return new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      const pollResult = await pollRequest(client, reporter);

      reporter.info(`Query poll status is ${pollResult.status}`);

      if (pollResult.status === 'COMPLETED') {
        const result = await axios(pollResult.url);

        if (result.data) {
          const data = parseParentChild(result.data, types);

          resolve(data);
        } else {
          reject(result);
        }

        clearInterval(interval);
      } else if (pollResult.status !== 'RUNNING') {
        reject(pollResult);
        clearInterval(interval);
      }
    }, 5000);
  });
};
