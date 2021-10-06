import React from 'react';
import { graphql, Link } from 'gatsby';
import { Heading, Paragraph } from '@smallstep/step-ui';

const Page = ({ data }) => (
  <>
    <Heading variant="h2">Practical Zero Trust</Heading>
    <Paragraph component="ul">
      {data.allPztYaml.edges.map(({ node }) => (
        <li key={node.slug}>
          <Link to={`/practical-zero-trust/${node.slug}-tls`}>{node.name}</Link>
        </li>
      ))}
    </Paragraph>
  </>
);

export const query = graphql`
  query {
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
