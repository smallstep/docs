require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    siteUrl: process.env.SITE_URL || `https://smallstep.com`,
  },
  assetPrefix: 'https://pzt.infra.smallstep.com',
  plugins: [
    `gatsby-plugin-remove-trailing-slashes`,
    {
      resolve: `gatsby-plugin-compile-es6-packages`,
      options: {
        modules: [`gatsby-theme-material-ui`],
      },
    },
    {
      resolve: `gatsby-theme-material-ui`,
      options: {
        webFontsConfig: {
          fonts: {
            google: [
              {
                family: `Open Sans`,
                variants: [`400`, `600`, `700`, `800`],
              },
              {
                family: `Cousine`,
                variants: [`400`, `700`],
              },
            ],
          },
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pzt`,
        path: `${__dirname}/src/pzt`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs`,
        path: `${__dirname}/src/pages/docs`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          docs: require.resolve('./src/components/DocsLayout.jsx'),
        },
      },
    },
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-plugin-next-seo`,
      options: {
        openGraph: {
          site_name: 'Smallstep',
        },
        twitter: {
          handle: '@smallsteplabs',
        },
      },
    },
  ],
};
