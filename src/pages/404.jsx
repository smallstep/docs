import React from 'react';
import { Box } from '@material-ui/core';
import { Container, Heading, Paragraph } from '@smallstep/step-ui';

import Link from '../components/Link';

const Page = () => (
  <Container size="md">
    <Box p={8}>
      {/* TODO <title> */}
      <Heading variant="h2">
        Someone took a smallstep in the wrong direction.
      </Heading>
      <Paragraph>
        Maybe you'd like to see our <Link href="/docs">documentation</Link>?
      </Paragraph>
    </Box>
  </Container>
);

export default Page;
