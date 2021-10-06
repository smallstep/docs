import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { ApolloProvider, useMutation } from '@apollo/react-hooks';
import ThemeTopLayout from 'gatsby-theme-material-ui-top-layout/src/components/top-layout';
import { SiteLayout } from '@smallstep/layouts';
import { Paragraph, BlockQuote, Code } from '@smallstep/step-ui';
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

import { client } from '../../graphql';
import { HUBSPOT_SUBSCRIBE } from '../../queries';
import MDXBlock from '../../components/MDXBlock';
import Alert from '../../components/Alert';
import AlertTitle from '../../components/AlertTitle';
import Aside from '../../components/Aside';
import Footnote from '../../components/Footnote';
import Reference from '../../components/Reference';
import H1 from '../../components/H1';
import H2 from '../../components/H2';
import H3 from '../../components/H3';
import HN from '../../components/HN';
import Li from '../../components/Li';
import Em from '../../components/Em';
import Strong from '../../components/Strong';
import Image from '../../components/Image';
import CodeBlock from '../../components/CodeBlock';
import Link from '../../components/Link';
import ContentLink from '../../components/ContentLink';
import Table from '../../components/Table';
import TableHead from '../../components/TableHead';
import TableBody from '../../components/TableBody';
import TableRow from '../../components/TableRow';
import TableCell from '../../components/TableCell';

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

const shortcodes = {
  MDXBlock,
  Alert,
  AlertTitle,
  Aside,
  BlockQuote,
  Code,
  CodeBlock,
  ContentLink,
  Em,
  Footnote,
  H1,
  H2,
  H3,
  HN,
  Image,
  Li,
  Link,
  Paragraph,
  Reference,
  Strong,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
};

export default function TopLayout({ children, theme }) {
  const [hubspotSubscribe] = useMutation(HUBSPOT_SUBSCRIBE, { client });

  return (
    <MDXProvider components={{ ...components, ...shortcodes }}>
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
        <ApolloProvider client={client}>
          <ThemeTopLayout theme={theme}>
            <SiteLayout
              clymPropertyId={process.env.GATSBY_CLYM_PROPERTY_ID}
              intercomAppId={process.env.GATSBY_INTERCOM_APP_ID}
              onSubscribe={async ({ email }) => {
                const hutkCookie = document.cookie
                  .split('; ')
                  .find((cookie) => cookie.startsWith('hubspotutk='));
                const hutk = hutkCookie ? hutkCookie.split('=')[1] : '';

                await hubspotSubscribe({
                  variables: {
                    email,
                    pageName: document.title,
                    pageUri: window.location.href,
                    hutk,
                  },
                });
              }}
            >
              {children}
            </SiteLayout>
          </ThemeTopLayout>
        </ApolloProvider>
      </CodeBlock.GrammarProvider>
    </MDXProvider>
  );
}
