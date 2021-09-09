import React from 'react';
import { Link } from 'gatsby';
import { Heading, Paragraph } from '@smallstep/step-ui';

const Page = () => (
  <>
    <Heading variant="h2">
      Someone took a smallstep in the wrong direction.
    </Heading>
    <Paragraph>
      Were you looking for our awesome how-tos on{' '}
      <Link to="/">Pratical Zero Trust</Link>?
    </Paragraph>
  </>
);

export default Page;
