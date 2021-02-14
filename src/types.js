export const types = {
  customer: 'Customer',
  order: 'Order',
  product: 'Product',
  variant: 'Variant',
  lineItem: 'LineItem',
  metafield: 'Metafield'
};

const pluralTypes = {
  [types.customer]: 'customers',
  [types.order]: 'orders',
  [types.lineItem]: 'lineItems',
  [types.metafield]: 'metafields',
  [types.product]: 'products',
  [types.variant]: 'variants'
};

const composeTypes = (...typeNames) =>
  typeNames.reduce((prev, curr) => {
    prev[curr] = pluralTypes[curr];
    return prev;
  }, {});

export const typeMappings = {
  [types.customer]: composeTypes(types.metafield),
  [types.order]: composeTypes(types.lineItem),
  [types.product]: composeTypes(types.metafield, types.variant)
};
