import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { ContentLink as SuiContentLink } from '@smallstep/step-ui';

const ContentLink = ({ href, ...props }) =>
  href.match(/^(https?|mailto):/) ? (
    <SuiContentLink href={href} {...props} />
  ) : (
    <SuiContentLink component={Link} to={href} {...props} />
  );

ContentLink.propTypes = {
  href: PropTypes.string.isRequired,
};

export default ContentLink;
