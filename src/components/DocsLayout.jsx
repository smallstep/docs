import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbySeo, ArticleJsonLd } from 'gatsby-plugin-next-seo';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import {
  Box,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Grid,
  Hidden,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Heading, Code, ToolsIcon } from '@smallstep/step-ui';

import DocsNav from './DocsNav';
import ContentLink from './ContentLink';

const DEFAULT_IMAGE_PATH = '/graphics/smallstep-docs-unfurl.png';

const CTA_ICONS = {
  ToolsIcon: <ToolsIcon />,
};

const useDocsNavStyles = makeStyles((theme) => ({
  root: {
    borderRight: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  },
}));

const useTitleStyles = makeStyles((theme) => ({
  root: {
    maxWidth: theme.breakpoints.values.md,
    padding: `0 ${theme.spacing(2)}px`,
    [theme.breakpoints.up('md')]: {
      padding: `${theme.spacing(4)}px ${theme.spacing(6)}px`,
    },
  },
}));

const useTocStyles = makeStyles((theme) => ({
  root: {
    borderLeft: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'flex-start',
    },
  },
}));

const DocsLayout = ({ location, pageContext, toc, children }) => {
  const theme = useTheme();
  const [submenus, setSubmenus] = useState({});

  const {
    title,
    image: imagePath,
    html_title: htmlTitle,
    description,
    cta,
  } = pageContext.frontmatter;

  const { site, docsYaml: contents } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
        }
      }
      docsYaml {
        smallstep_ssh {
          path
          title
        }
        registration_authorities {
          title
          path
        }
        platform {
          path
          title
        }
        step_ca {
          title
          path
        }
        step_cli {
          title
          path
        }
        tutorials {
          path
          title
        }
        certificate_manager {
          path
          title
        }
      }
    }
  `);

  const { siteUrl } = site.siteMetadata;
  const { pathname } = location;

  const robotsTitle = htmlTitle || title.replace(/`/g, '');

  const docsNavClasses = useDocsNavStyles();
  const titleClasses = useTitleStyles();
  const tocClasses = useTocStyles();
  const image = require(`../../static${
    imagePath || DEFAULT_IMAGE_PATH
  }`).default;

  useEffect(() => {
    if (!submenus) {
      return;
    }

    // expand all submenu for current doc's base path
    Object.keys(contents).forEach((product) => {
      if (submenus[product] && pathname.indexOf(submenus[product].href) === 0) {
        submenus[product].expand();
      }
    });
  }, [submenus, pathname, contents]);

  const url = `${siteUrl}${pathname}`;

  return (
    <>
      <GatsbySeo
        type="article"
        title={robotsTitle}
        description={description}
        openGraph={{
          title,
          description,
          url,
          type: 'article',
          images: [{ url: image }],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />

      <ArticleJsonLd
        url={url}
        headline={robotsTitle}
        images={[image]}
        authorName="Smallstep"
        publisherName="Smallstep"
        publisherLogo="https://smallstep.com/uploads/smallstep_tm_full_rust.svg"
        description={description}
      />

      <Grid
        container
        style={{
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Grid item xs={12} md={5} xl={4} classes={docsNavClasses}>
          <Hidden mdUp implementation="css">
            <Box m={2}>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Heading variant="h5" mb={0}>
                    Menu
                  </Heading>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Box width="100%">
                    <DocsNav pathname={pathname} />
                  </Box>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Box>
          </Hidden>

          <Hidden smDown implementation="css">
            <Box width="420px" pl={4} pr={2} py={4}>
              <DocsNav
                pathname={pathname}
                submenusRef={(ref) => setSubmenus(ref)}
              />
            </Box>
          </Hidden>
        </Grid>

        <Grid
          item
          xs={12}
          md={7}
          xl={5}
          style={{
            marginTop: theme.spacing(1),
          }}
        >
          <div className={titleClasses.root}>
            <Grid container>
              <Grid item xs={12} sm={cta ? 8 : 12}>
                {title && (
                  <Box mb={2}>
                    <Heading variant="h2" component="h1">
                      {title
                        .split('`')
                        .map((chunk, i) =>
                          i % 2 === 0 ? chunk : <Code key={chunk}>{chunk}</Code>
                        )}
                    </Heading>
                  </Box>
                )}
              </Grid>
              {cta && (
                <Grid item xs={12} sm={4}>
                  <ContentLink tile icon={CTA_ICONS[cta.icon]} href={cta.path}>
                    {cta.text
                      .split('`')
                      .map((chunk, i) =>
                        i % 2 === 0 ? chunk : <Code key={chunk}>{chunk}</Code>
                      )}
                  </ContentLink>
                </Grid>
              )}
            </Grid>

            <Box p={2}>{children}</Box>

            {cta && (
              <Box mt={6}>
                <ContentLink tile icon={CTA_ICONS[cta.icon]} href={cta.path}>
                  {cta.text
                    .split('`')
                    .map((chunk, i) =>
                      i % 2 === 0 ? chunk : <Code key={chunk}>{chunk}</Code>
                    )}
                </ContentLink>
              </Box>
            )}
          </div>
        </Grid>

        {toc && (
          <Grid item xl={3} classes={tocClasses}>
            <Hidden lgDown implementation="css">
              <Box my={4} mx={2}>
                {toc}
              </Box>
            </Hidden>
          </Grid>
        )}
      </Grid>
    </>
  );
};

DocsLayout.propTypes = {
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
  toc: PropTypes.node,
  children: PropTypes.node.isRequired,
};

DocsLayout.defaultProps = {
  toc: null,
};

export default DocsLayout;
