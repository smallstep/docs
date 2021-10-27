import React from 'react';
import { graphql, Link } from 'gatsby';
import { Paragraph } from '@smallstep/step-ui';

import DocsLayout from '../components/DocsLayout';
import H3 from '../components/H3';

const Page = ({ data, location, pageContext }) => (
  <DocsLayout
    location={location}
    pageContext={{ frontmatter: { title: 'Full Index' } }}
  >
    <H3>Practical Zero Trust</H3>
    <Paragraph component="ul">
      {data.allPztYaml.edges.map(({ node }) => (
        <li key={node.slug}>
          <Link to={`/practical-zero-trust/${node.slug}-tls`}>{node.name}</Link>
        </li>
      ))}
    </Paragraph>

    <H3>Docs</H3>
    <Paragraph component="ul">
      {data.allSitePage.edges.map(({ node }) => (
        <li key={node.path}>
          <Link to={node.path}>{node.context.frontmatter.title}</Link>
        </li>
      ))}
    </Paragraph>
  </DocsLayout>
);

export const query = graphql`
  query {
    allSitePage(filter: { path: { regex: "^/docs/" } }) {
      edges {
        node {
          path
          context {
            frontmatter {
              title
            }
          }
        }
      }
    }
    allPztYaml {
      edges {
        node {
          slug
          name
        }
      }
    }
  }
`;

export default Page;
