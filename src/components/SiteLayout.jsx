import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Box } from '@material-ui/core';
import { SiteLayout as StepSiteLayout } from '@smallstep/layouts';
import { Container } from '@smallstep/step-ui';

import { HUBSPOT_SUBSCRIBE } from '../queries';

const SiteLayout = ({ children }) => {
  const [hubspotSubscribe] = useMutation(HUBSPOT_SUBSCRIBE);

  return (
    <StepSiteLayout
      onSubscribe={async ({ email }) => {
        const hutkCookie = document.cookie
          .split('; ')
          .find((cookie) => cookie.startsWith('hubspotutk='));
        const hutk = hutkCookie ? hutkCookie.split('=')[1] : '';

        await hubspotSubscribe({
          variables: {
            email,
            pageName: document.title,
            pageUri: window.location.href,
            hutk,
          },
        });
      }}
    >
      <Box py={4}>
        <Container size="md">{children}</Container>
      </Box>
    </StepSiteLayout>
  );
};

export default SiteLayout;
