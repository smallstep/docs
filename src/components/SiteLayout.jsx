import React from 'react';
import PropTypes from 'prop-types';
import {
  SiteLayout as StepSiteLayout,
  useInitJS,
  useIntercom,
} from '@smallstep/internal';

const SiteLayout = ({ children }) => {
  useInitJS({
    gtmId: process.env.GATSBY_GTM_ID,
    gtmAuth: process.env.GATSBY_GTM_AUTH,
    gtmPreview: process.env.GATSBY_GTM_PREVIEW,
  });

  useIntercom();

  return <StepSiteLayout>{children}</StepSiteLayout>;
};

SiteLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SiteLayout;
