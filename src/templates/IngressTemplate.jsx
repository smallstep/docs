import React from 'react';
import Box from '@material-ui/core/Box';

import MDXBlock from '../components/MDXBlock';
import HBase from '../components/HBase';
import ProvisionerSelector from '../components/ProvisionerSelector';

const IngressTemplate = ({
  pzt,
  content,
  provisioner,
  onProvisionerChange,
}) => (
  <>
    <Box mb={4}>
      <MDXBlock path="sections/00-intro" />
    </Box>

    <Box mb={6}>
      <HBase variant="h4">Set up a private certificate authority</HBase>
      <MDXBlock path="sections/10-try/10-certificate" />
    </Box>

    <Box mb={6}>
      <HBase variant="h4">Select a provisioner</HBase>
      <MDXBlock path="sections/20-operationalize/10-renewal/00-intro" />

      <Box my={4}>
        <ProvisionerSelector
          provisioner={provisioner}
          onProvisionerChange={onProvisionerChange}
        />
      </Box>

      <Box mb={6}>
        <MDXBlock
          show={provisioner === 'jwk'}
          path="sections/20-operationalize/10-renewal/10-provisioner/jwk"
        />
        <MDXBlock
          show={provisioner === 'acme'}
          path="sections/20-operationalize/10-renewal/10-provisioner/acme"
        />
      </Box>

      <HBase variant="h4" mb={4}>
        Configure Automated {pzt.name} TLS Renewal
      </HBase>

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

      <HBase variant="h4">
        Distribute your root certificate to end users and systems
      </HBase>
      <MDXBlock path="sections/20-operationalize/20-root" />
    </Box>

    {content[`${pzt.slug}/sections/40-further-reading`] && (
      <Box mb={6}>
        <HBase variant="h3">Further reading</HBase>
        <MDXBlock path="sections/40-further-reading" />
      </Box>
    )}

    <HBase variant="h3">Contribute to this document</HBase>
    <MDXBlock path="sections/50-contribute" />
  </>
);

export default IngressTemplate;
