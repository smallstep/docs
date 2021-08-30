import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { ContentLink as SuiContentLink } from '@smallstep/step-ui';

const ContentLink = ({ href, ...props }) =>
  href.match(/^(https?|mailto):/) ? (
    <SuiContentLink href={href} {...props} />
  ) : (
    // TODO does this work with gatsby?
    <Link to={href}>
      <SuiContentLink {...props} />
    </Link>
  );

ContentLink.propTypes = {
  href: PropTypes.string.isRequired,
};

export default ContentLink;
