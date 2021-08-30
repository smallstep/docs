import React from 'react';
import PropTypes from 'prop-types';
import { Link as GatsbyLink } from 'gatsby';
import { Link as SuiLink } from '@smallstep/step-ui';

const Link = ({ href, ...props }) =>
  href.match(/^(https?|mailto):/) ? (
    <SuiLink external href={href} {...props} />
  ) : (
    // TODO style this as SuiLink still
    <GatsbyLink to={href} {...props} />
  );

Link.propTypes = {
  href: PropTypes.string.isRequired,
};

export default Link;
