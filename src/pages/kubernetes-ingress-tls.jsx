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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
  const { allMdx } = data;

  const doc = {
    slug: 'kubernetes-ingress',
    name: 'Kubernetes Ingress',
    written: 'September 21, 2021',
    server: {
      name: 'myserver',
    },
    kubernetes: {
      ingressClass: 'nginx',
    },
  };

  const classes = useStyles();

  const [provisioner, setProvisioner] = useState('jwk');

  useEffect(() => {
    const { provisioner: queryProvisioner } = queryString.parse(
      location.search
    );
    setProvisioner(queryProvisioner || 'jwk');
  }, [location.search]);

  const handleProvisionerChange = ({ target: { value } }) => {
    setProvisioner(value);
    window.history.pushState(
      {},
      '',
      `${location.pathname}?${queryString.stringify({
        provisioner: value,
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

      <PageContext.Provider value={{ provisioner }}>
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

            <MDXBlock path="sections/20-operationalize/10-renewal/20-deployments/kubernetes/10-certificate" />
            <MDXBlock
              show={provisioner === 'jwk'}
              path="sections/20-operationalize/10-renewal/20-deployments/kubernetes/20-issuer/jwk"
            />
            <MDXBlock
              show={provisioner === 'acme'}
              path="sections/20-operationalize/10-renewal/20-deployments/kubernetes/20-issuer/acme"
            />

            <Paragraph>
              [TODO] ingress configuration content here, just rework
              ingress-nginx (nginx) content
            </Paragraph>
            <MDXBlock path="sections/20-operationalize/10-renewal/20-deployments/kubernetes/30-configuration" />
          </Box>

          <HBase variant="h4">
            Distribute your root certificate to end users and systems
          </HBase>
          <MDXBlock path="sections/20-operationalize/20-root" />

          <HBase variant="h3">Contribute to this document</HBase>
          <MDXBlock path="sections/50-contribute" />
        </DocContext.Provider>
      </PageContext.Provider>
    </>
  );
};

export const query = graphql`
  query {
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
