import 'moment-timezone';
import React, { useState, useEffect } from 'react';
import { graphql, navigate } from 'gatsby';
import { GatsbySeo, ArticleJsonLd } from 'gatsby-plugin-next-seo';
import queryString from 'query-string';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Container, Heading, Paragraph } from '@smallstep/step-ui';

import { PztContext } from '../../context';
import ServerTemplate from '../../templates/ServerTemplate';
import IngressTemplate from '../../templates/IngressTemplate';

const useStyles = makeStyles((theme) => ({
  timestamp: {
    color: theme.palette.text.secondary,
  },
}));

const Page = ({ data, location }) => {
  const { site, pztYaml: pzt, allMdx, allFile: unfurlImages } = data;

  const classes = useStyles();

  const [provisioner, setProvisioner] = useState('jwk');
  const [deployment, setDeployment] = useState(
    pzt.template === 'ingress' ? 'kubernetes' : 'linux'
  );

  useEffect(() => {
    const { provisioner: queryProvisioner, deployment: queryDeployment } =
      queryString.parse(location.search);

    const initialProvisioner = queryProvisioner || 'jwk';
    let initialDeployment;

    if (queryDeployment) {
      initialDeployment = queryDeployment;
    } else if (pzt.template === 'ingress') {
      initialDeployment = 'kubernetes';
    } else if (initialProvisioner === 'acme' && pzt.acme) {
      initialDeployment = 'builtin';
    } else {
      initialDeployment = 'linux';
    }

    setProvisioner(initialProvisioner);
    setDeployment(initialDeployment);
  }, [location.search, pzt.template, pzt.acme]);

  const handleProvisionerChange = ({ target: { value } }) => {
    let updatedDeployment = 'linux';

    if (value === 'acme') {
      updatedDeployment = pzt.acme ? 'builtin' : 'linux';
    }

    setProvisioner(value);
    setDeployment(updatedDeployment);
    navigate(
      `${location.pathname}?${queryString.stringify({
        provisioner: value,
        deployment: updatedDeployment,
      })}`
    );
  };

  const handleDeploymentChange = (event, value) => {
    setDeployment(value);
    navigate(
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

  const title = `${pzt.name} TLS — How to get and renew ${pzt.name} TLS certificates — Practical Zero Trust`;
  const description = `Step-by-step instructions for operationalizing ${pzt.name} TLS certificates on Linux, Docker, or Kubernetes.`;
  const { siteUrl } = site.siteMetadata;
  const url = `${siteUrl}${location.pathname}`;
  const unfurl = unfurlImages.edges.find(
    ({ node }) => node.relativePath === `${pzt.slug}/unfurl.png`
  );
  const defaultUnfurl = unfurlImages.edges.find(
    ({ node }) => node.relativePath === 'default/unfurl.png'
  );

  const writtenISO = pzt.written
    ? moment(pzt.written)
        .set('hour', 12)
        .tz('America/Los_Angeles')
        .toISOString()
    : undefined;
  const updatedISO = pzt.updated
    ? moment(pzt.updated)
        .set('hour', 12)
        .tz('America/Los_Angeles')
        .toISOString()
    : undefined;

  return (
    <>
      <GatsbySeo
        type="article"
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          url,
          type: 'article',
          article: {
            publishedTime: writtenISO,
            modifiedTime: updatedISO,
          },
          images: [
            {
              url: unfurl
                ? unfurl.node.publicURL
                : defaultUnfurl.node.publicURL,
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />

      <ArticleJsonLd
        url={url}
        headline={title}
        images={[unfurl ? unfurl.node.publicURL : defaultUnfurl.node.publicURL]}
        datePublished={writtenISO}
        dateModified={updatedISO}
        authorName="Smallstep"
        publisherName="Smallstep"
        publisherLogo="https://smallstep.com/uploads/smallstep_tm_full_rust.svg"
        description={description}
      />

      <PztContext.Provider
        value={{
          pzt: {
            protocol: 'https',
            acme: false,
            ...pzt,
            server: {
              name: 'myserver',
              dnsName: 'myserver.example.net',
              port: 443,
              ...pzt.server,
            },
            linux: {
              systemdUnitName: pzt.slug,
              ...pzt.linux,
            },
            kubernetes: {
              ingressClass: 'nginx',
              ...pzt.kubernetes,
            },
          },
          content,
          provisioner,
          deployment,
        }}
      >
        <Container size="md">
          <Box mt={6} mb={4}>
            <Heading variant="h1">
              {pzt.name} TLS &mdash; Practical Zero Trust
            </Heading>
            <Heading component="h2" variant="h3">
              How to get and renew {pzt.name} TLS certificates
            </Heading>
            <Paragraph variant="body2" className={classes.timestamp}>
              Written {pzt.written}
              {pzt.updated && `, last updated ${pzt.updated}`}
            </Paragraph>
          </Box>

          {pzt.template === 'server' && (
            <ServerTemplate
              pzt={pzt}
              content={content}
              provisioner={provisioner}
              deployment={deployment}
              onProvisionerChange={handleProvisionerChange}
              onDeploymentChange={handleDeploymentChange}
            />
          )}

          {pzt.template === 'ingress' && (
            <IngressTemplate
              pzt={pzt}
              content={content}
              provisioner={provisioner}
              onProvisionerChange={handleProvisionerChange}
            />
          )}
        </Container>
      </PztContext.Provider>
    </>
  );
};

export const query = graphql`
  query ($id: String) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    pztYaml(id: { eq: $id }) {
      slug
      name
      template
      written
      updated
      server {
        name
        dnsName
        port
      }
      linux {
        systemdUnitName
      }
      kubernetes {
        ingressClass
      }
      acme
      rootDistribution
    }
    allFile(filter: { extension: { eq: "png" }, name: { eq: "unfurl" } }) {
      edges {
        node {
          name
          relativePath
          publicURL
        }
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
