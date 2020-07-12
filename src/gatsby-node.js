import { transformOrderNode, transformProductNode } from './transform';
import { createQuery } from './query';

const ordersQuery = `
query {
  orders(first: 100) {
    edges {
      node {
        id
        name
        createdAt
        customer {
          displayName
          email
        }
        fullyPaid
        displayFulfillmentStatus
        totalTaxSet {
          shopMoney {
            amount
          }
        }
        totalShippingPriceSet {
          shopMoney {
            amount
          }
        }
        totalReceivedSet {
          shopMoney {
            amount
          }
        }
        lineItems(first: 50) {
          edges {
            node {
              id
              quantity
              product {
                id
                title
                priceRange {
                  maxVariantPrice {
                    amount
                  }
                }
              }
              variant {
                id
                price
              }
            }
          }
        }
      }
    }
  }
}
`;

const productsQuery = `
query {
  products(first: 100) {
    edges {
      node {
        id
      }
    }
  }
}
`;

exports.sourceNodes = async ({ actions, reporter }, options) => {
  try {
    const { createNode } = actions;

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

    const products = await createQuery(
      productsQuery,
      {
        Variant: 'variants'
      },
      options,
      reporter
    );

    reporter.info(
      `gatsby-source-shopify-graphql fetched ${products.length} products`
    );
    products.forEach((product) => createNode(transformProductNode(product)));
  } catch (error) {
    reporter.panicOnBuild(error);
  }

  return;
};
