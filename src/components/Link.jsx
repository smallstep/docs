import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Link as GatsbyLink } from 'gatsby';
import { Link as SuiLink } from '@smallstep/step-ui';

const Link = forwardRef(({ href, ...rest }, ref) =>
  href.match(/^(https?|mailto):/) ? (
    <SuiLink ref={ref} external href={href} {...rest} />
  ) : (
    <SuiLink ref={ref} component={GatsbyLink} to={href} {...rest} />
  )
);

Link.propTypes = {
  href: PropTypes.string.isRequired,
};

export default Link;
