import React from 'react';
import PropTypes from 'prop-types';
import { Link as SuiLink } from '@smallstep/step-ui';

const Link = ({ href, ...props }) => (
  <SuiLink external href={href} {...props} />
);

Link.propTypes = {
  href: PropTypes.string.isRequired,
};

export default Link;
