import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { css } from '@emotion/react';
import {
  Heading,
  Paragraph,
  BlockQuote,
  Code,
  ToolsIcon,
} from '@smallstep/step-ui';
import { useTheme } from '@material-ui/core/styles';
import { MDXProvider } from '@mdx-js/react';
import {
  Box,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Grid,
  Hidden,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { isEmpty } from 'ramda';

import apacheconf from 'refractor/lang/apacheconf';
import diff from 'refractor/lang/diff';
import go from 'refractor/lang/go';
import ini from 'refractor/lang/ini';
import json from 'refractor/lang/json';
import nginx from 'refractor/lang/nginx';
import powershell from 'refractor/lang/powershell';
import python from 'refractor/lang/python';
import shellSession from 'refractor/lang/shell-session';
import yaml from 'refractor/lang/yaml';

import contents from '../../../pages/docs/contents.yaml';
import DocsNav from '../../docs/components/DocsNav';
import H1 from '../../docs/components/H1';
import H2 from '../../docs/components/H2';
import H3 from '../../docs/components/H3';
import HN from '../../docs/components/HN';
import Li from '../../docs/components/Li';
import Em from '../../docs/components/Em';
import Strong from '../../docs/components/Strong';
import Image from '../../docs/components/Image';
import CodeBlock from '../../docs/components/CodeBlock';
import Link from '../../docs/components/Link';
import Table from '../../docs/components/Table';
import TableHead from '../../docs/components/TableHead';
import TableBody from '../../docs/components/TableBody';
import TableRow from '../../docs/components/TableRow';
import TableCell from '../../docs/components/TableCell';
import ContentLink from '../../docs/components/ContentLink';
import SiteLayout from './SiteLayout';

const { publicRuntimeConfig } = getConfig();
const { websiteBaseUrl } = publicRuntimeConfig;

const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: HN,
  h5: HN,
  h6: HN,
  p: Paragraph,
  a: Link,
  pre: CodeBlock,
  blockquote: BlockQuote,
  inlineCode: Code,
  li: Li,
  em: Em,
  strong: Strong,
  img: Image,
  table: Table,
  thead: TableHead,
  tbody: TableBody,
  tr: TableRow,
  th: TableCell,
  td: TableCell,
};

const CTA_ICONS = {
  ToolsIcon: <ToolsIcon />,
};

const DocsLayout = ({
  title,
  subtitle,
  htmlTitle,
  description,
  unfurl,
  cta,
  toc,
  componentOverrides,
  children,
}) => {
  const theme = useTheme();
  const router = useRouter();
  const [submenus, setSubmenus] = useState({});

  const { pathname, asPath } = router;

  const robotsTitle = htmlTitle || title.replace(/`/g, '');

  useEffect(() => {
    if (isEmpty(submenus)) {
      return;
    }

    // expand all submenu for current doc's base path
    Object.keys(contents).forEach(product => {
      if (pathname.indexOf(submenus[product].href) === 0) {
        submenus[product].expand();
      }
    });
  }, [submenus]);

  return (
    <SiteLayout title={robotsTitle}>
      <Head>
        <meta property="og:url" content={`${websiteBaseUrl}${asPath}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={robotsTitle} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@smallsteplabs" />
        <meta name="twitter:title" content={robotsTitle} />
        {description && (
          <>
            <meta name="description" content={description} />
            <meta property="og:description" content={description} />
            <meta name="twitter:description" content={description} />
          </>
        )}
        {unfurl && (
          <>
            <meta property="og:image" content={`${websiteBaseUrl}${unfurl}`} />
            <meta name="twitter:image" content={`${websiteBaseUrl}${unfurl}`} />
          </>
        )}
      </Head>

      <MDXProvider components={{ ...components, ...componentOverrides }}>
        <Grid
          container
          spacing={2}
          css={css`
            border-top: 1px solid ${theme.palette.divider};
          `}
        >
          <Grid
            item
            xs={12}
            md={4}
            xl={3}
            css={css`
              border-right: 1px solid ${theme.palette.divider};
              ${theme.breakpoints.up('md')} {
                display: flex;
                justify-content: flex-end;
              }
            `}
          >
            <Hidden mdUp>
              <Box m={2}>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Heading variant="h5" mb={0}>
                      Menu
                    </Heading>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Box width="100%">
                      <DocsNav />
                    </Box>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Box>
            </Hidden>

            <Hidden smDown>
              <Box maxWidth="340px" pl={4} pr={2} py={4}>
                <DocsNav submenusRef={ref => setSubmenus(ref)} />
              </Box>
            </Hidden>
          </Grid>

          <Grid
            item
            xs={12}
            md={8}
            xl={6}
            css={css`
              margin-top: ${theme.spacing(1)}px;
            `}
          >
            <div
              css={css`
                max-width: ${theme.breakpoints.values.md}px;
                padding: 0 ${theme.spacing(2)}px;
                ${theme.breakpoints.up('md')} {
                  padding: ${theme.spacing(4)}px ${theme.spacing(6)}px;
                }
              `}
            >
              <Grid container>
                <Grid item xs={12} sm={cta ? 8 : 12}>
                  {title && (
                    <Box mb={subtitle ? 0 : 2}>
                      <Heading
                        variant="h2"
                        component="h1"
                        mb={subtitle ? 0 : undefined}
                      >
                        {title
                          .split('`')
                          .map((chunk, i) =>
                            i % 2 === 0 ? (
                              chunk
                            ) : (
                              <Code key={chunk}>{chunk}</Code>
                            )
                          )}
                      </Heading>
                    </Box>
                  )}
                  {subtitle && (
                    <Box mb={2}>
                      <Heading variant="subtitle1" component="h2">
                        {subtitle
                          .split('`')
                          .map((chunk, i) =>
                            i % 2 === 0 ? (
                              chunk
                            ) : (
                              <Code key={chunk}>{chunk}</Code>
                            )
                          )}
                      </Heading>
                    </Box>
                  )}
                </Grid>
                {cta && (
                  <Grid item xs={12} sm={4}>
                    <ContentLink
                      tile
                      icon={CTA_ICONS[cta.icon]}
                      href={cta.path}
                    >
                      {cta.text
                        .split('`')
                        .map((chunk, i) =>
                          i % 2 === 0 ? chunk : <Code key={chunk}>{chunk}</Code>
                        )}
                    </ContentLink>
                  </Grid>
                )}
              </Grid>

              <CodeBlock.GrammarProvider
                grammars={[
                  apacheconf,
                  diff,
                  go,
                  ini,
                  json,
                  nginx,
                  powershell,
                  python,
                  shellSession,
                  yaml,
                ]}
              >
                {children}
              </CodeBlock.GrammarProvider>
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

          <Hidden lgDown>
            {toc && (
              <Grid
                item
                xl={3}
                css={css`
                  border-left: 1px solid ${theme.palette.divider};
                  ${theme.breakpoints.up('md')} {
                    display: flex;
                    justify-content: flex-start;
                  }
                `}
              >
                <Box my={4} mx={2}>
                  {toc}
                </Box>
              </Grid>
            )}
          </Hidden>
        </Grid>
      </MDXProvider>
    </SiteLayout>
  );
};

DocsLayout.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  htmlTitle: PropTypes.string,
  description: PropTypes.string,
  unfurl: PropTypes.string,
  cta: PropTypes.shape({
    text: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }),
  toc: PropTypes.node,
  componentOverrides: PropTypes.object,
  children: PropTypes.node.isRequired,
};

DocsLayout.defaultProps = {
  title: 'Documentation',
  subtitle: null,
  htmlTitle: null,
  description: null,
  unfurl: '/static/graphics/smallstep-docs-unfurl.png',
  cta: null,
  toc: null,
  componentOverrides: {},
};

export default DocsLayout;
