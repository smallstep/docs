const escapeStringRegexp = require('escape-string-regexp');
const { default: slugify } = require('slugify');

const pagePath = `pages/`; //path to the docs pages /pages/docs/ect...
const indexName = `Pages`; //Algolia querie index name

const pageQuery = `{
  pages: allMdx(
    filter: {
      fileAbsolutePath: { regex: "/${escapeStringRegexp(pagePath)}/" },
    }
  ) {
    edges {
      node {
        id
        frontmatter {
          title
        }
        excerpt(pruneLength: 8000)
        slug
      }
    }
  }
}`;

function pageToAlgoliaRecord({
  node: { id, slug, frontmatter, fields, ...rest },
}) {
  return {
    objectID: id,
    slug,
    ...frontmatter,
    ...fields,
    ...rest,
  };
}

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
];

module.exports = queries;
