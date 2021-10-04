import React from 'react';
import { graphql, Link } from 'gatsby';
import { Heading, Paragraph } from '@smallstep/step-ui';

const Page = ({ data }) => (
  <>
    <Heading variant="h2">Practical Zero Trust</Heading>
    <Paragraph component="ul">
      {data.allDocsYaml.edges.map(({ node }) => (
        <li key={node.slug}>
          <Link to={`/practical-zero-trust/${node.slug}-tls`}>{node.name}</Link>
        </li>
      ))}
    </Paragraph>
  </>
);

export const query = graphql`
  query {
    allDocsYaml {
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
