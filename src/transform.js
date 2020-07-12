import createNodeHelpers from 'gatsby-node-helpers';

export const types = {
  customer: 'Customer',
  order: 'Order',
  product: 'Product',
  variant: 'Variant',
  lineItem: 'LineItem'
};

const { createNodeFactory } = createNodeHelpers({
  typePrefix: 'Shopify'
});

export const transformOrderNode = createNodeFactory(
  types.order,
  (order) => order
);

export const transformProductNode = createNodeFactory(
  types.product,
  (product) => product
);
