import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { NavItem as SuiNavItem } from '@smallstep/step-ui';

import Link from '../../ui/components/Link';

const NavItem = ({ icon, href, text, submenuRef, children }) => {
  const router = useRouter();
  const { pathname } = router;

  return (
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
};

NavItem.propTypes = {
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
