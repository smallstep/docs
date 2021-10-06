import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import {
  NavMenu,
  Heading,
  StepPlatformIcon,
  StepSshIcon,
  StepCertManagerIcon,
  StepCliIcon,
  StepCaIcon,
  StepMutualTlsIcon,
  StepRaIcon,
  StepTutorialsIcon,
} from '@smallstep/step-ui';

import contents from '../../../pages/docs/contents.yaml';
import NavItem from './NavItem';
import NavSubItem from './NavSubItem';

const RE_EXTERNAL = /^(https?:|mailto:)/;

const submenus = {};

const getSubItems = (product) => {
  if (contents[product].length === 0) {
    return null;
  }

  return contents[product]
    .filter(({ path }) => !path.match(RE_EXTERNAL))
    .map(({ title, path }) => (
      <NavSubItem key={path} text={title} href={`/docs/${path}`} />
    ));
};

const DocsNav = ({ submenusRef }) => {
  useEffect(() => {
    submenusRef(submenus);
  }, []);

  return (
    <>
      <Box mb={2}>
        <Heading variant="h5">Platform</Heading>
        <NavMenu>
          <NavItem
            icon={<StepPlatformIcon />}
            text="The Smallstep Platform"
            href="/docs/platform"
            submenuRef={(submenu) => {
              submenus.platform = submenu;
            }}
          >
            {getSubItems('platform')}
          </NavItem>
        </NavMenu>
      </Box>

      <Box mb={2}>
        <Heading variant="h5">Products</Heading>
        <NavMenu>
          <NavItem
            icon={<StepSshIcon />}
            text="SSH"
            href="/docs/ssh"
            submenuRef={(submenu) => {
              submenus.smallstep_ssh = submenu;
            }}
          >
            {getSubItems('smallstep_ssh')}
          </NavItem>

          <NavItem
            icon={<StepCertManagerIcon />}
            text="Certificate Manager"
            href="/docs/certificate-manager"
            submenuRef={(submenu) => {
              submenus.certificate_manager = submenu;
            }}
          >
            {getSubItems('certificate_manager')}
          </NavItem>

          <NavItem
            icon={<StepRaIcon />}
            text="Registration Authorities"
            href="/docs/registration-authorities"
            submenuRef={(submenu) => {
              submenus.registration_authorities = submenu;
            }}
          >
            {getSubItems('registration_authorities')}
          </NavItem>
        </NavMenu>
      </Box>

      <Heading variant="h5">Open Source</Heading>
      <NavMenu>
        <NavItem
          icon={<StepCliIcon />}
          text="step CLI"
          href="/docs/step-cli"
          submenuRef={(submenu) => {
            submenus.step_cli = submenu;
          }}
        >
          {getSubItems('step_cli')}
        </NavItem>

        <NavItem
          icon={<StepCaIcon />}
          text="step-ca"
          href="/docs/step-ca"
          submenuRef={(submenu) => {
            submenus.step_ca = submenu;
          }}
        >
          {getSubItems('step_ca')}
        </NavItem>

        <NavItem
          icon={<StepMutualTlsIcon />}
          text="Practical Zero Trust"
          href="/docs/practical-zero-trust"
          submenuRef={(submenu) => {
            submenus.practical_zero_trust = submenu;
          }}
        >
          {getSubItems('practical_zero_trust')}
        </NavItem>

        <NavItem
          icon={<StepMutualTlsIcon />}
          text="Mutual TLS"
          href="/docs/mtls"
          submenuRef={(submenu) => {
            submenus.mutual_tls = submenu;
          }}
        >
          {getSubItems('mutual_tls')}
        </NavItem>

        <NavItem
          icon={<StepTutorialsIcon />}
          text="Tutorials"
          href="/docs/tutorials"
          submenuRef={(submenu) => {
            submenus.tutorials = submenu;
          }}
        >
          {getSubItems('tutorials')}
        </NavItem>
      </NavMenu>
    </>
  );
};

DocsNav.propTypes = {
  submenusRef: PropTypes.func,
};

DocsNav.defaultProps = {
  submenusRef: Function.prototype,
};

export default DocsNav;
