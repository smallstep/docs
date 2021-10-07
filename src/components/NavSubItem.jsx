import React from 'react';
import PropTypes from 'prop-types';
import { NavSubItem as SuiNavSubItem, Code } from '@smallstep/step-ui';

import Link from './Link';

const NavSubItem = ({ pathname, href, text }) => (
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

NavSubItem.propTypes = {
  pathname: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default NavSubItem;
