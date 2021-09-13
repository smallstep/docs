import React from 'react';
import { graphql } from 'gatsby';
import { GatsbySeo } from 'gatsby-plugin-next-seo';
import { Heading, Paragraph } from '@smallstep/step-ui';

import { DocContext } from '../context';
import MDXBlock from '../components/MDXBlock';

const Page = ({ data }) => {
  const { docsYaml: doc, allMdx } = data;

  const content = allMdx.edges.reduce(
    (obj, { node }) => ({
      ...obj,
      [node.slug]: node,
    }),
    {}
  );

  return (
    <>
      <GatsbySeo
        type="article"
        title={`${doc.name} TLS — How to get TLS certificates and keep them renewed | Practical Zero Trust`}
        description={`Practical step-by-step instructions for implementing zero trust principals with ${doc.name}.`}
      />

      <DocContext.Provider value={{ doc, content }}>
        <Heading variant="h1">{doc.name} TLS / Practical Zero Trust</Heading>
        <Heading variant="h2">
          How to get {doc.name} TLS certificates and keep them renewed
        </Heading>

        <Heading variant="h3">Part 1. Try it</Heading>
        <Heading variant="h4">
          Create a private key and request a certificate
        </Heading>
        <MDXBlock path="sections/01-try/01-certificate" />
        <Heading variant="h4">
          Configure {doc.name} to use the certificate
        </Heading>
        <MDXBlock path="sections/01-try/02-server" />
        <Heading variant="h4">Connect to {doc.name} from your client</Heading>
        <MDXBlock path="sections/01-try/03-test" />

        <Heading variant="h3">Part 2. Operationalize it</Heading>
        <Heading variant="h4">Automate {doc.name} certificate renewal</Heading>
        <Paragraph>
          Some tabs here indicating different approaches to renewal depending on
          the supported deployments. The ACME content will only live under the
          ACME tab.
        </Paragraph>
        <Heading variant="h4">
          Distribute your root certificate to end users and systems
        </Heading>
        <Paragraph>Some stuff here about distributing roots.</Paragraph>
      </DocContext.Provider>
    </>
  );
};

export const query = graphql`
  query ($id: String) {
    docsYaml(id: { eq: $id }) {
      slug
      name
      paths {
        rootCert
        serverCert
        serverKey
      }
    }
    allMdx {
      edges {
        node {
          slug
          body
          frontmatter {
            links {
              text
              url
            }
          }
        }
      }
    }
  }
`;

export default Page;
