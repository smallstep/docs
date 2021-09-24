require('dotenv').config();

module.exports = {
  pathPrefix: '/practical-zero-trust',
  assetPrefix: 'https://pzt.infra.smallstep.com',
  plugins: [
    `gatsby-plugin-remove-trailing-slashes`,
    {
      resolve: `gatsby-plugin-compile-es6-packages`,
      options: {
        modules: [`gatsby-theme-material-ui`]
      }
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
        name: `metadata`,
        path: `${__dirname}/src/docs`,
      },
    },
    `gatsby-plugin-mdx`,
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
