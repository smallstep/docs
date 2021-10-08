import React from 'react';
import { Link } from 'gatsby';
import { Box } from '@material-ui/core';
import { Container, Heading, Paragraph } from '@smallstep/step-ui';

const Page = () => (
  <Container size="md">
    <Box p={8}>
      <Heading variant="h2">
        Someone took a smallstep in the wrong direction.
      </Heading>
      <Paragraph>
        Maybe you'd like to see our <Link to="/docs">documentation</Link>?
      </Paragraph>
    </Box>
  </Container>
);

export default Page;
