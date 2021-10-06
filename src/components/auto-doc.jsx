import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { useTheme } from '@material-ui/styles';
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

import Link from '../../ui/components/Link';
import DocsLayout from '../../ui/layouts/DocsLayout';
import H3 from '../components/H3';
import DocsLink from '../components/Link';

const componentOverrides = {
  h2: H3,
  // eslint-disable-next-line react/prop-types
  a: ({ href, ...props }) => {
    const { pathname } = useRouter();
    return (
      <DocsLink
        href={
          // eslint-disable-next-line react/prop-types
          href.match(/^(https?:|mailto:|\/)/)
            ? href
            : `${pathname.split('/').slice(-1)[0]}/${href}`
        }
        {...props}
      />
    );
  },
};

const Layout = frontMatter => {
  const { title, menu } = frontMatter;

  const MdxDocsLayout = ({ children }) => {
    const theme = useTheme();

    return (
      <DocsLayout
        title={`\`${title}\``}
        componentOverrides={componentOverrides}
        toc={
          menu ? (
            <>
              <Box mt={2} mr={2} mb={1} ml={2}>
                <Heading variant="h5" mb={0}>
                  Commands
                </Heading>
              </Box>

              <Divider light />

              <List
                css={css`
                  padding-top: 0;
                `}
              >
                {menu.docs.parent && (
                  <>
                    <ListItem
                      button
                      component={Link}
                      href={`/docs/step-cli/reference/${title
                        .split(' ')
                        .slice(1, -1)
                        .join('/')}`}
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
                    css={css`
                      color: ${theme.palette.text.blue};
                    `}
                  >
                    <Code>{title}</Code>
                  </ListItemText>
                </ListItem>

                {'children' in menu.docs && (
                  <>
                    <Divider light />

                    {menu.docs.children.map(subcommand => (
                      <ListItem
                        key={subcommand}
                        button
                        component={Link}
                        href={`/docs/step-cli/reference/${[
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
        {children}
      </DocsLayout>
    );
  };

  MdxDocsLayout.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return MdxDocsLayout;
};

export default Layout;
