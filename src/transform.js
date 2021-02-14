import { createNodeHelpers } from 'gatsby-node-helpers';

import { types } from './types';

export const getTransforms = (createNodeId, createContentDigest) => {
  const { createNodeFactory } = createNodeHelpers({
    typePrefix: 'Shopify',
    createNodeId,
    createContentDigest
  });

  return {
    [types.customer]: createNodeFactory(types.customer),
    [types.order]: createNodeFactory(types.order),
    [types.product]: createNodeFactory(types.product)
  };
};
