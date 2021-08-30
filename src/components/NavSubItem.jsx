import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { NavSubItem as SuiNavSubItem, Code } from '@smallstep/step-ui';

import Link from '../../ui/components/Link';

const NavSubItem = ({ href, text }) => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <SuiNavSubItem
      active={pathname === href}
      href={href}
      text={text
        .split('`')
        .map((chunk, i) =>
          i % 2 === 0 ? chunk : <Code key={chunk}>{chunk}</Code>
        )}
      linkProps={{ component: Link }}
    />
  );
};

NavSubItem.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default NavSubItem;
