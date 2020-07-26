import { transformOrderNode, transformProductNode } from './transform';
import { createQuery } from './query';
import { ordersQuery, productsQuery } from './queries';

exports.sourceNodes = async ({ actions, reporter }, options) => {
  try {
    const { createNode } = actions;
    const { queries } = options;

    if (!queries || queries.orders) {
      const orders = await createQuery(
        ordersQuery,
        {
          LineItem: 'lineItems'
        },
        options,
        reporter
      );

      reporter.info(
        `gatsby-source-shopify-graphql fetched ${orders.length} orders`
      );
      orders.forEach((order) => createNode(transformOrderNode(order)));
    }

    if (!queries || queries.products) {
      const products = await createQuery(
        productsQuery,
        {
          Metafield: 'metafields',
          Variant: 'variants'
        },
        options,
        reporter
      );

      reporter.info(
        `gatsby-source-shopify-graphql fetched ${products.length} products`
      );
      products.forEach((product) => createNode(transformProductNode(product)));
    }
  } catch (error) {
    reporter.panicOnBuild(error);
  }

  return;
};
