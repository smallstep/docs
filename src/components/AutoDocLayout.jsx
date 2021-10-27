import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { MDXProvider, useMDXComponents } from '@mdx-js/react';
import { useTheme } from '@material-ui/core/styles';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import { Heading, Code } from '@smallstep/step-ui';

import DocsLayout from './DocsLayout';
import H3 from './H3.jsx';

const AutoDocLayout = ({ location, pageContext, children }) => {
  const { title, menu } = pageContext.frontmatter;
  const theme = useTheme();

  const components = useMDXComponents();

  const parentPath = title.split(' ').slice(1, -1).join('/');

  return (
    <DocsLayout
      location={location}
      pageContext={{
        ...pageContext,
        frontmatter: {
          ...pageContext.frontmatter,
          title: `\`${title}\``,
        },
      }}
      toc={
        menu ? (
          <>
            <Box mt={2} mr={2} mb={1} ml={2}>
              <Heading variant="h5" mb={0}>
                Commands
              </Heading>
            </Box>

            <Divider light />

            <List style={{ paddingTop: 0 }}>
              {menu.docs.parent && (
                <>
                  <ListItem
                    button
                    component={Link}
                    to={`/docs/step-cli/reference${
                      parentPath ? `/${parentPath}` : ''
                    }`}
                    underline="none"
                  >
                    <ListItemIcon>
                      <ArrowBackIcon />
                    </ListItemIcon>
                    <ListItemText>
                      <Code>{menu.docs.parent}</Code>
                    </ListItemText>
                  </ListItem>

                  <Divider light />
                </>
              )}

              <ListItem>
                <ListItemIcon>
                  <Box width={24} textAlign="center">
                    &bull;
                  </Box>
                </ListItemIcon>
                <ListItemText
                  style={{
                    color: theme.palette.text.blue,
                  }}
                >
                  <Code>{title}</Code>
                </ListItemText>
              </ListItem>

              {'children' in menu.docs && (
                <>
                  <Divider light />

                  {menu.docs.children.map((subcommand) => (
                    <ListItem
                      key={subcommand}
                      button
                      component={Link}
                      to={`/docs/step-cli/reference/${[
                        ...title.split(' ').slice(1),
                        subcommand,
                      ].join('/')}`}
                      underline="none"
                    >
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon />
                      </ListItemIcon>
                      <ListItemText>
                        <Code>
                          {title} {subcommand}
                        </Code>
                      </ListItemText>
                    </ListItem>
                  ))}
                </>
              )}
            </List>
          </>
        ) : null
      }
    >
      <MDXProvider components={{ ...components, h2: H3 }}>
        {children}
      </MDXProvider>
    </DocsLayout>
  );
};

AutoDocLayout.propTypes = {
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default AutoDocLayout;
