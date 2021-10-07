import 'moment-timezone';
import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import { GatsbySeo, ArticleJsonLd } from 'gatsby-plugin-next-seo';
import queryString from 'query-string';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import { Heading, Paragraph } from '@smallstep/step-ui';

import { DocContext } from '../context';
import ServerTemplate from '../templates/ServerTemplate';
import IngressTemplate from '../templates/IngressTemplate';

const useStyles = makeStyles((theme) => ({
  timestamp: {
    color: theme.palette.text.secondary,
  },
}));

const Page = ({ data, location }) => {
  const { site, docsYaml: doc, allMdx, allFile: unfurlImages } = data;

  const classes = useStyles();

  const [provisioner, setProvisioner] = useState('jwk');
  const [deployment, setDeployment] = useState(
    doc.template === 'ingress' ? 'kubernetes' : 'linux'
  );

  useEffect(() => {
    const { provisioner: queryProvisioner, deployment: queryDeployment } =
      queryString.parse(location.search);

    const initialProvisioner = queryProvisioner || 'jwk';
    let initialDeployment;

    if (queryDeployment) {
      initialDeployment = queryDeployment;
    } else if (doc.template === 'ingress') {
      initialDeployment = 'kubernetes';
    } else if (initialProvisioner === 'acme' && doc.acme) {
      initialDeployment = 'builtin';
    } else {
      initialDeployment = 'linux';
    }

    setProvisioner(initialProvisioner);
    setDeployment(initialDeployment);
  }, [location.search, doc.template, doc.acme]);

  const handleProvisionerChange = ({ target: { value } }) => {
    let updatedDeployment =
      value === 'jwk' && deployment === 'builtin' ? 'linux' : deployment;

    if (value === 'acme' && provisioner === 'jwk') {
      updatedDeployment = 'builtin';
    }

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

  const title = `${doc.name} TLS — How to get and renew ${doc.name} TLS certificates — Practical Zero Trust`;
  const description = `Step-by-step instructions for operationalizing ${doc.name} TLS certificates on Linux, Docker, or Kubernetes.`;
  const { siteUrl } = site.siteMetadata;
  const url = `${siteUrl}${location.pathname}`;
  const unfurl = unfurlImages.edges.find(({ node }) => (
    node.relativePath.includes(`${doc.slug}/unfurl.png`)
  ));
  const defaultUnfurl = unfurlImages.edges.find(({ node }) => (
    node.relativePath.includes(`default/unfurl.png`)
  ));

  const writtenISO = doc.written
    ? moment(doc.written)
        .set('hour', 12)
        .tz('America/Los_Angeles')
        .toISOString()
    : undefined;
  const updatedISO = doc.updated
    ? moment(doc.updated)
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
          images: [{
            url: unfurl ? unfurl.node.publicURL : defaultUnfurl.node.publicURL
          }]
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

      <DocContext.Provider
        value={{
          doc: {
            protocol: 'https',
            acme: false,
            ...doc,
            server: {
              name: 'myserver',
              dnsName: 'myserver.example.net',
              port: 443,
              ...doc.server,
            },
            linux: {
              systemdUnitName: doc.slug,
              ...doc.linux,
            },
            kubernetes: {
              ingressClass: 'nginx',
              ...doc.kubernetes,
            },
          },
          content,
          provisioner,
          deployment,
        }}
      >
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

        {doc.template === 'server' && (
          <ServerTemplate
            doc={doc}
            content={content}
            provisioner={provisioner}
            deployment={deployment}
            onProvisionerChange={handleProvisionerChange}
            onDeploymentChange={handleDeploymentChange}
          />
        )}

        {doc.template === 'ingress' && (
          <IngressTemplate
            doc={doc}
            content={content}
            provisioner={provisioner}
            onProvisionerChange={handleProvisionerChange}
          />
        )}
      </DocContext.Provider>
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
    docsYaml(id: { eq: $id }) {
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
    }
    allFile (filter: {extension: {eq: "png"}, name: {eq: "unfurl"} }){
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
