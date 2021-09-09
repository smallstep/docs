import React from 'react';
import { graphql, Link } from 'gatsby';
import { Heading, Paragraph } from '@smallstep/step-ui';

const Page = ({ data }) => (
  <>
    <Heading variant="h2">Practical Zero Trust</Heading>
    <Paragraph component="ul">
      {data.allMetadataYaml.edges.map(({ node }) => (
        <li key={node.doc}>
          <Link
            to={`/${node.doc}/how-to-get-tls-certificates-and-keep-them-renewed`}
          >
            {node.name}
          </Link>
        </li>
      ))}
    </Paragraph>
  </>
);

export const query = graphql`
  query {
    allMetadataYaml {
      edges {
        node {
          doc
          name
        }
      }
    }
  }
`;

export default Page;
