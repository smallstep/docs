import Link from 'next/link';
import PropTypes from 'prop-types';
import { ContentLink as SuiContentLink } from '@smallstep/step-ui';

const ContentLink = ({ href, ...props }) =>
  href.match(/^(https?|mailto):/) ? (
    <SuiContentLink href={href} {...props} />
  ) : (
    <Link href={href} passHref>
      <SuiContentLink {...props} />
    </Link>
  );

ContentLink.propTypes = {
  href: PropTypes.string.isRequired,
};

export default ContentLink;
