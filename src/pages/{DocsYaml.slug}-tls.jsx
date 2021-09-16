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
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
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
  }, [location.search]);

  const handleProvisionerChange = ({ target: { value } }) => {
    const initialDeployment =
      value === 'acme' && doc.acme ? 'builtin' : 'linux';
    setProvisioner(value);
    setDeployment(initialDeployment);
    window.history.pushState(
      {},
      '',
      `${location.pathname}?${queryString.stringify({
        provisioner: value,
        deployment: initialDeployment,
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

      <DocContext.Provider value={{ doc, content }}>
        <Box mb={4}>
          <Heading variant="h1">
            {doc.name} TLS &mdash; Practical Zero Trust
          </Heading>
          <Heading component="h2" variant="h3">
            How to get and renew {doc.name} TLS certificates.
          </Heading>
          <Paragraph variant="body2" className={classes.timestamp}>
            Written {doc.written}
            {doc.updated && `, last updated ${doc.updated}`}
          </Paragraph>
          <MDXBlock path="sections/01-intro" />
        </Box>

        <Box mb={6}>
          <HBase variant="h3">Try it</HBase>
          <HBase variant="h4">
            Create a private key and request a certificate
          </HBase>
          <MDXBlock path="sections/02-try/01-certificate" />
          <HBase variant="h4">
            Configure {doc.name} to use the certificate
          </HBase>
          <MDXBlock path="sections/02-try/02-server" />
          <HBase variant="h4">Test {doc.name} TLS configuration</HBase>
          <MDXBlock path="sections/02-try/03-test" />
        </Box>

        <Box mb={6}>
          <HBase variant="h3">Operationalize it</HBase>
          <HBase variant="h4">Automate {doc.name} certificate renewal</HBase>
          <MDXBlock path="sections/03-operationalize/01-renewal/01-intro" />

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
                  label="Generic (password-based)"
                />
                <FormControlLabel
                  value="acme"
                  control={<Radio color="primary" />}
                  label="ACME"
                />
              </RadioGroup>
            </FormControl>
          </Box>

          <TabContext value={deployment}>
            <TabList onChange={handleDeploymentChange}>
              <Tab label="Linux (systemd)" value="linux" />
              <Tab label="Docker" value="docker" />
              <Tab label="Kubernetes" value="kubernetes" />
            </TabList>

            <TabPanel value="builtin">
              <MDXBlock path="sections/03-operationalize/01-renewal/02-deployments/builtin-acme" />
            </TabPanel>

            <TabPanel value="linux">
              {provisioner === 'jwk' && (
                <>
                  <MDXBlock path="sections/03-operationalize/01-renewal/02-deployments/linux/01-template/jwk" />
                  <MDXBlock path="sections/03-operationalize/01-renewal/02-deployments/linux/02-override" />
                </>
              )}
              {provisioner === 'acme' && (
                <>
                  <MDXBlock path="sections/03-operationalize/01-renewal/02-deployments/linux/01-template/acme" />
                  <MDXBlock path="sections/03-operationalize/01-renewal/02-deployments/linux/02-override" />
                </>
              )}
            </TabPanel>

            <TabPanel value="docker">
              {provisioner === 'jwk' && (
                <MDXBlock path="sections/03-operationalize/01-renewal/02-deployments/docker/jwk" />
              )}
              {provisioner === 'acme' && (
                <MDXBlock path="sections/03-operationalize/01-renewal/02-deployments/docker/acme" />
              )}
            </TabPanel>

            <TabPanel value="kubernetes">
              {provisioner === 'jwk' && (
                <MDXBlock path="sections/03-operationalize/01-renewal/02-deployments/kubernetes/jwk" />
              )}
              {provisioner === 'acme' && (
                <MDXBlock path="sections/03-operationalize/01-renewal/02-deployments/kubernetes/acme" />
              )}
            </TabPanel>
          </TabContext>

          <HBase variant="h4">
            Distribute your root certificate to end users and systems
          </HBase>
          <Paragraph>Some stuff here about distributing roots.</Paragraph>
        </Box>

        {content[`${doc.slug}/sections/04-research-notes`] && (
          <Box mb={6}>
            <HBase variant="h3">Research notes</HBase>
            <Paragraph>
              In researching {doc.name} TLS, we did some thorough investigation.
              Here are our rough notes if you are interested in diving deeper.
            </Paragraph>
            <MDXBlock path="sections/04-research-notes" />
          </Box>
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
