import React from 'react';
import { graphql } from 'gatsby';
import { GatsbySeo } from 'gatsby-plugin-next-seo';
import { makeStyles } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Heading, Paragraph } from '@smallstep/step-ui';

import { DocContext } from '../context';
import MDXBlock from '../components/MDXBlock';
import HBase from '../components/HBase';
import Alert from '../components/Alert';
import Li from '../components/Li';
import Em from '../components/Em';

const useStyles = makeStyles((theme) => ({
  timestamp: {
    color: theme.palette.text.secondary,
  },
}));

const Page = ({ data }) => {
  const { docsYaml: doc, allMdx } = data;

  const classes = useStyles();

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
        <Heading variant="h1">
          {doc.name} TLS &mdash; Practical Zero Trust
        </Heading>
        <Heading component="h2" variant="h3">
          How to get {doc.name} TLS certificates and keep them renewed
        </Heading>
        <Paragraph variant="body2" className={classes.timestamp}>
          Written {doc.written}
          {doc.updated && `, updated ${doc.updated}`}
        </Paragraph>
        <HBase variant="h4">Zero trust for the real world</HBase>
        <Paragraph>
          While there's little question about the value of a zero trust security
          model in modern infrastructure, there's often a great deal of
          confusion as to what "zero trust" means for the practitioners who are
          responsible for its implementation. The <Em>Practical Zero Trust</Em>{' '}
          project aims to remove some of that confusion with two high-level
          goals:
        </Paragraph>

        <Paragraph component="ol">
          <Li>
            To demonstrate that "zero trust" for infrastructure simply means
            implementing the already-broadly-supported TLS protocol
          </Li>
          <Li>
            To provide concrete, step-by-step instructions on how to actually
            configure and operationalize TLS for each piece of your
            infrastructure
          </Li>
        </Paragraph>
        <Paragraph>
          This article will guide you through using a private certificate
          authority (CA) to authenticate and encrypt {doc.name} traffic with
          TLS.
        </Paragraph>
        <MDXBlock path="sections/01-intro" />
        <HBase variant="h3">Try it</HBase>
        <HBase variant="h4">
          Create a private key and request a certificate
        </HBase>
        <MDXBlock path="sections/02-try/01-certificate" />
        <HBase variant="h4">Configure {doc.name} to use the certificate</HBase>
        <MDXBlock path="sections/02-try/02-server" />
        <HBase variant="h4">Test {doc.name} TLS configuration</HBase>
        <MDXBlock path="sections/02-try/03-test" />
        <HBase variant="h3">Operationalize it</HBase>
        <HBase variant="h4">Automate {doc.name} certificate renewal</HBase>
        <Paragraph>
          [explanatory copy about non-acme vs acme (more work but standard if
          you have a use case)]
        </Paragraph>
        <Tabs value="jwk">
          <Tab label="Non-ACME" value="jwk" />
          <Tab label="ACME" value="acme" />
        </Tabs>
        <Tabs orientation="vertical" value="builtin">
          <Tab label="Built-in" value="builtin" />
          <Tab label="Linux w/ systemd" value="systemd" />
          <Tab label="Linux (non-systemd / Docker)" value="linux" />
          <Tab label="Kubernetes" value="kubernetes" />
        </Tabs>

        <HBase variant="h5">Built-in / ACME</HBase>
        <MDXBlock path="sections/03-operationalize/01-renewal/01-builtin" />
        <HBase variant="h5">Systemd / Generic</HBase>
        <MDXBlock path="sections/03-operationalize/01-renewal/02-systemd/01-template/01-generic" />
        <MDXBlock path="sections/03-operationalize/01-renewal/02-systemd/02-override" />
        <HBase variant="h5">Systemd / ACME</HBase>
        <MDXBlock path="sections/03-operationalize/01-renewal/02-systemd/01-template/02-acme" />
        <MDXBlock path="sections/03-operationalize/01-renewal/02-systemd/02-override" />
        <HBase variant="h5">Linux / Generic</HBase>
        <MDXBlock path="sections/03-operationalize/01-renewal/03-linux/01-generic" />
        <HBase variant="h5">Linux / ACME</HBase>
        <MDXBlock path="sections/03-operationalize/01-renewal/03-linux/02-acme" />
        <HBase variant="h5">Kubernetes / Generic</HBase>
        <MDXBlock path="sections/03-operationalize/01-renewal/04-kubernetes/01-generic" />
        <HBase variant="h5">Kubernetes / ACME</HBase>
        <MDXBlock path="sections/03-operationalize/01-renewal/04-kubernetes/02-acme" />

        <HBase variant="h4">
          Distribute your root certificate to end users and systems
        </HBase>
        <Paragraph>Some stuff here about distributing roots.</Paragraph>
        {content[`${doc.slug}/sections/04-research-notes`] && (
          <>
            <HBase variant="h3">Research notes</HBase>
            <Paragraph>
              In researching {doc.name} TLS, we did some thorough investigation.
              Here are our rough notes if you are interested in diving deeper.
            </Paragraph>
            <MDXBlock path="sections/04-research-notes" />
          </>
        )}
        <HBase variant="h3">Further reading</HBase>
        <Paragraph>[structured links]</Paragraph>
        <HBase variant="h3">Contribute to this document</HBase>
        <Paragraph>[link to GH]</Paragraph>
      </DocContext.Provider>
    </>
  );
};

export const query = graphql`
  query ($id: String) {
    docsYaml(id: { eq: $id }) {
      slug
      name
      written
      updated
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
        }
      }
    }
  }
`;

export default Page;
