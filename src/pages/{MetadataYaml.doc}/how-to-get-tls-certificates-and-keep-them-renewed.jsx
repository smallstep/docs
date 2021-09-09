import React from 'react';
import { graphql } from 'gatsby';
import { GatsbySeo } from 'gatsby-plugin-next-seo';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Heading, Paragraph } from '@smallstep/step-ui';

const Page = ({ data }) => {
  const { metadataYaml: metadata } = data;
  const content = data.allMdx.edges.reduce(
    (obj, { node }) => ({
      ...obj,
      [node.slug.split('/')[1]]: node.body,
    }),
    {}
  );

  return (
    <>
      <GatsbySeo
        type="article"
        title={`${metadata.name} — How to get TLS certificates and keep them renewed | Practical Zero Trust`}
        description={`Practical step-by-step instructions for implementing zero trust principals with ${metadata.name}.`}
      />

      <Heading variant="h1">{metadata.name} Practical Zero Trust</Heading>
      <Heading variant="h2">
        How to get {metadata.name} TLS certificates and keep them renewed
      </Heading>

      <Heading variant="h3">Try it</Heading>
      <Heading variant="h4">
        Create a private key and request a certificate
      </Heading>
      <Paragraph>
        Some content here about setting up CA and issuing cert with the right
        name.
      </Paragraph>
      <Heading variant="h4">
        Configure {metadata.name} to use the certificate
      </Heading>
      <MDXRenderer>{content.server_auth}</MDXRenderer>
      <Heading variant="h4">
        Connect to {metadata.name} from your client
      </Heading>
      <MDXRenderer>{content.client}</MDXRenderer>

      <Heading variant="h3">Operationalize it</Heading>
      <Heading variant="h4">
        Automate {metadata.name} certificate renewal
      </Heading>
      <Paragraph>
        Some tabs here indicating different approaches to renewal depending on
        the supported deployments. The ACME content will only live under the
        ACME tab.
      </Paragraph>
      <MDXRenderer>{content.acme_renewal}</MDXRenderer>
      <Heading variant="h4">
        Distribute your root certificate to end users and systems
      </Heading>
      <Paragraph>Some stuff here about distributing roots.</Paragraph>
    </>
  );
};

export const query = graphql`
  query ($id: String, $doc: String) {
    metadataYaml(id: { eq: $id }) {
      name
      paths {
        rootCert
        serverCert
        serverKey
      }
      commands {
        restart
      }
      deployments
    }
    allMdx(filter: { frontmatter: { doc: { eq: $doc } } }) {
      edges {
        node {
          slug
          body
        }
      }
    }
  }
`;

export default Page;
