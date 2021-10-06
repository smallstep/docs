import React from 'react';
import { graphql, Link } from 'gatsby';
import { Container, Heading, Paragraph } from '@smallstep/step-ui';

const Page = ({ data }) => (
  <Container size="md">
    <Heading variant="h2">Docs</Heading>
    <Paragraph component="ul">
      {data.allSitePage.edges.map(({ node }) => (
        <li key={node.path}>
          <Link to={node.path}>{node.context.frontmatter.title}</Link>
        </li>
      ))}
    </Paragraph>

    <Heading variant="h2">Practical Zero Trust</Heading>
    <Paragraph component="ul">
      {data.allPztYaml.edges.map(({ node }) => (
        <li key={node.slug}>
          <Link to={`/practical-zero-trust/${node.slug}-tls`}>{node.name}</Link>
        </li>
      ))}
    </Paragraph>
  </Container>
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
