import React, { useState, useEffect } from 'react';

import { graphql } from 'gatsby';
import { GatsbySeo } from 'gatsby-plugin-next-seo';
import queryString from 'query-string';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Heading, Paragraph } from '@smallstep/step-ui';

import { DocContext, PageContext } from '../context';
import MDXBlock from '../components/MDXBlock';
import HBase from '../components/HBase';

const useStyles = makeStyles((theme) => ({
  timestamp: {
    color: theme.palette.text.secondary,
  },
  tabPanel: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: theme.spacing(4),
    paddingBotom: 0,
  },
}));

const Page = ({ data, location }) => {
  const { docsYaml: doc, allMdx } = data;

  const classes = useStyles();

  const [provisioner, setProvisioner] = useState('jwk');
  const [deployment, setDeployment] = useState('linux');

  useEffect(() => {
    const { provisioner: queryProvisioner, deployment: queryDeployment } =
      queryString.parse(location.search);

    const initialProvisioner = queryProvisioner || 'jwk';
    let initialDeployment;
    if (queryDeployment) {
      initialDeployment = queryDeployment;
    } else {
      initialDeployment =
        initialProvisioner === 'acme' && doc.acme ? 'builtin' : 'linux';
    }

    setProvisioner(initialProvisioner);
    setDeployment(initialDeployment);
  }, [location.search, doc.acme]);

  const handleProvisionerChange = ({ target: { value } }) => {
    const updatedDeployment =
      value === 'jwk' && deployment === 'builtin' ? 'linux' : deployment;

    setProvisioner(value);
    setDeployment(updatedDeployment);
    window.history.pushState(
      {},
      '',
      `${location.pathname}?${queryString.stringify({
        provisioner: value,
        deployment: updatedDeployment,
      })}`
    );
  };

  const handleDeploymentChange = (event, value) => {
    setDeployment(value);
    window.history.pushState(
      {},
      '',
      `${location.pathname}?${queryString.stringify({
        provisioner,
        deployment: value,
      })}`
    );
  };

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
        title={`${doc.name} TLS — How to get and renew ${doc.name} TLS certificates | Practical Zero Trust`}
        description={`Practical step-by-step instructions for implementing zero trust principals with ${doc.name}.`}
      />

      <PageContext.Provider value={{ provisioner, deployment }}>
        <DocContext.Provider value={{ doc, content }}>
          <Box mb={4}>
            <Heading variant="h1">
              {doc.name} TLS &mdash; Practical Zero Trust
            </Heading>
            <Heading component="h2" variant="h3">
              How to get and renew {doc.name} TLS certificates
            </Heading>
            <Paragraph variant="body2" className={classes.timestamp}>
              Written {doc.written}
              {doc.updated && `, last updated ${doc.updated}`}
            </Paragraph>
          </Box>

          <Box mb={4}>
            <MDXBlock path="sections/00-intro" />
          </Box>

          <Box mb={6}>
            <HBase variant="h3">Try it</HBase>
            <HBase variant="h4">
              Create a private key and request a certificate
            </HBase>
            <MDXBlock path="sections/10-try/10-certificate" />
            <HBase variant="h4">
              Configure {doc.name} to use the certificate
            </HBase>
            <MDXBlock path="sections/10-try/20-server" />
            <HBase variant="h4">Test {doc.name} TLS configuration</HBase>
            <MDXBlock path="sections/10-try/30-test" />
          </Box>

          <Box mb={6}>
            <HBase variant="h3">Operationalize It</HBase>
            <HBase variant="h4">
            Issue A Certificate For {doc.name} TLS
            </HBase>
            <MDXBlock path="sections/20-operationalize/00-intro" />

            <HBase variant="h4">
            Configuring Automated {doc.name} TLS Renewal
            </HBase>
            <MDXBlock path="sections/20-operationalize/10-renewal/00-intro" />
            <Box my={4}>
              <FormControl component="fieldset">
                <Heading variant="h6" mb={2}>
                  Show me instructions for...
                </Heading>
                <RadioGroup
                  aria-label="provisioner"
                  name="provisioner"
                  value={provisioner}
                  onChange={handleProvisionerChange}
                >
                  <FormControlLabel
                    value="jwk"
                    control={<Radio color="primary" />}
                    label="Generic (password-based, etc.)"
                  />
                  <FormControlLabel
                    value="acme"
                    control={<Radio color="primary" />}
                    label="ACME"
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            <Box mb={4}>
              <MDXBlock
                show={provisioner === 'jwk'}
                path="sections/20-operationalize/10-renewal/10-provisioner/jwk"
              />
              <MDXBlock
                show={provisioner === 'acme'}
                path="sections/20-operationalize/10-renewal/10-provisioner/acme"
              />
            </Box>

            <Tabs value={deployment} onChange={handleDeploymentChange}>
              <Tab
                label="Built-In ACME"
                value="builtin"
                style={{
                  display:
                    provisioner === 'acme' && doc.acme ? 'inline-flex' : 'none',
                }}
              />
              <Tab label="Linux" value="linux" />
              <Tab label="Docker" value="docker" />
              <Tab label="Kubernetes" value="kubernetes" />
            </Tabs>

            <div
              className={classes.tabPanel}
              style={{ display: deployment === 'builtin' ? 'block' : 'none' }}
            >
              <MDXBlock path="sections/20-operationalize/10-renewal/20-deployments/builtin-acme" />
            </div>

            <div
              className={classes.tabPanel}
              style={{ display: deployment === 'linux' ? 'block' : 'none' }}
            >
              <MDXBlock
                show={provisioner === 'jwk'}
                path="sections/20-operationalize/10-renewal/20-deployments/linux/10-template/jwk"
              />
              <MDXBlock
                show={provisioner === 'acme'}
                path="sections/20-operationalize/10-renewal/20-deployments/linux/10-template/acme"
              />
              <MDXBlock path="sections/20-operationalize/10-renewal/20-deployments/linux/20-override" />
            </div>

            <div
              className={classes.tabPanel}
              style={{ display: deployment === 'docker' ? 'block' : 'none' }}
            >
              <MDXBlock
                show={provisioner === 'jwk'}
                path="sections/20-operationalize/10-renewal/20-deployments/docker/jwk"
              />
              <MDXBlock
                show={provisioner === 'acme'}
                path="sections/20-operationalize/10-renewal/20-deployments/docker/acme"
              />
            </div>

            <div
              className={classes.tabPanel}
              style={{
                display: deployment === 'kubernetes' ? 'block' : 'none',
              }}
            >
              <MDXBlock path="sections/20-operationalize/10-renewal/20-deployments/kubernetes/10-certificate" />
              <MDXBlock
                show={provisioner === 'jwk'}
                path="sections/20-operationalize/10-renewal/20-deployments/kubernetes/20-issuer/jwk"
              />
              <MDXBlock
                show={provisioner === 'acme'}
                path="sections/20-operationalize/10-renewal/20-deployments/kubernetes/20-issuer/acme"
              />
              <MDXBlock path="sections/20-operationalize/10-renewal/20-deployments/kubernetes/30-configuration" />
            </div>

            <HBase variant="h4">
              Distribute your root certificate to end users and systems
            </HBase>
            <MDXBlock path="sections/20-operationalize/20-root" />
          </Box>

          {content[`${doc.slug}/sections/30-research-notes/10-notes`] && (
            <Box mb={6}>
              <HBase variant="h3">Research notes</HBase>
              <MDXBlock path="sections/30-research-notes/00-intro" />
              <MDXBlock path="sections/30-research-notes/10-notes" />
            </Box>
          )}

          <HBase variant="h3">Further reading</HBase>
          <Paragraph>[structured links]</Paragraph>
          <HBase variant="h3">Contribute to this document</HBase>
          <Paragraph>[link to GH]</Paragraph>
        </DocContext.Provider>
      </PageContext.Provider>
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
      server {
        name
        dnsName
        port
      }
      kubernetes {
        ingressClass
      }
      acme
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
