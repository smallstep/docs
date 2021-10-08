import React from 'react';
import PropTypes from 'prop-types';
import { NavItem as SuiNavItem } from '@smallstep/step-ui';

import Link from './Link';

const NavItem = ({ pathname, icon, href, text, submenuRef, children }) => (
  <SuiNavItem
    icon={icon}
    active={pathname === href}
    href={href}
    text={text}
    linkProps={{ component: Link }}
    submenuRef={submenuRef}
  >
    {children}
  </SuiNavItem>
);

NavItem.propTypes = {
  pathname: PropTypes.string.isRequired,
  icon: PropTypes.element,
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  submenuRef: PropTypes.func,
  children: PropTypes.node,
};

NavItem.defaultProps = {
  icon: null,
  submenuRef: Function.prototype,
  children: null,
};

export default NavItem;
