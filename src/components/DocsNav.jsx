import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
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

import NavItem from './NavItem';
import NavSubItem from './NavSubItem';
import SearchBar from './SearchBar';

const RE_EXTERNAL = /^(https?:|mailto:)/;

const submenus = {};

const DocsNav = ({ pathname, submenusRef }) => {
  useEffect(() => {
    submenusRef(submenus);
  }, [submenusRef]);

  const { docsYaml: contents } = useStaticQuery(graphql`
    query {
      docsYaml {
        smallstep_ssh {
          path
          title
        }
        registration_authorities {
          title
          path
        }
        platform {
          path
          title
        }
        step_ca {
          title
          path
        }
        step_cli {
          title
          path
        }
        tutorials {
          path
          title
        }
        certificate_manager {
          path
          title
        }
      }
    }
  `);

  const getSubItems = (product) => {
    if (!contents[product] || contents[product].length === 0) {
      return null;
    }

    return contents[product]
      .filter(({ path }) => !path.match(RE_EXTERNAL))
      .map(({ title, path }) => (
        <NavSubItem
          key={path}
          pathname={pathname}
          text={title}
          href={`/docs/${path}`}
        />
      ));
  };

  return (
    <>
      <SearchBar/>

      <Box mb={2}>
        <Heading variant="h5">Platform</Heading>
        <NavMenu>
          <NavItem
            pathname={pathname}
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
            pathname={pathname}
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
            pathname={pathname}
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
            pathname={pathname}
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
          pathname={pathname}
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
          pathname={pathname}
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
          pathname={pathname}
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
          pathname={pathname}
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
          pathname={pathname}
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
  pathname: PropTypes.string.isRequired,
  submenusRef: PropTypes.func,
};

DocsNav.defaultProps = {
  submenusRef: Function.prototype,
};

export default DocsNav;
