import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Link as GatsbyLink } from 'gatsby';
import { Link as SuiLink } from '@smallstep/step-ui';

const Link = forwardRef(({ href: originalHref, ...rest }, ref) => {
  // this bit is a hack to overcome a bug in gatsby-plugin-mdx. for links in MDX
  // that begin with a slash (/), gatsby prefixes them with the assetPrefix,
  // which doesn't make sense. we make sure it gets stripped off.
  let href = originalHref.replace(/^.*pzt\.infra\.smallstep\.com\//g, '/');
  href = href.replace(/^.*prof\.infra\.smallstep\.com\//g, '/');

  return href.match(/^(https?|mailto):/) ? (
    <SuiLink ref={ref} external href={href} {...rest} />
  ) : (
    <SuiLink ref={ref} component={GatsbyLink} to={href} {...rest} />
  );
});

Link.propTypes = {
  href: PropTypes.string.isRequired,
};

export default Link;
