import { createQuery } from './query';
import queries from './queries';
import { getTransforms } from './transform';
import { types, typeMappings } from './types';

const packageName = 'gatsby-source-shopify-graphql';
const fetchTypes = [types.customer, types.order, types.product];

exports.sourceNodes = async (
  { actions, reporter, createNodeId, createContentDigest },
  options
) => {
  try {
    const { createNode } = actions;
    const { queries: queryOptions } = options;
    const transforms = getTransforms(createNodeId, createContentDigest);

    for (const type of fetchTypes) {
      if (!queryOptions || Boolean(queryOptions[type])) {
        reporter.info(`${packageName} fetching ${type}s`);
        const transform = transforms[type];
        const results = await createQuery(
          queries[type],
          typeMappings[type],
          options,
          reporter
        );

        if (Array.isArray(results)) {
          reporter.info(`${packageName} fetched ${results.length} ${type}s`);
          results.forEach((result) => createNode(transform(result)));
        } else {
          reporter.error(`${packageName} failed to fetch ${type}s`);
        }
      }
    }
  } catch (error) {
    reporter.panicOnBuild(error);
  }

  return;
};
