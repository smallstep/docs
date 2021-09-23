import React from 'react';
import { Box } from '@material-ui/core';
import { Container, Logo, Link as SuiLink } from '@smallstep/step-ui';

const SiteLayout = ({ children }) => [
  React.createElement(
    Container,
    { size: 'md' },
    React.createElement(
      Box,
      { width: 200, mt: 6, mb: 2 },
      React.createElement(
        SuiLink,
        { href: 'https://smallstep.com', underline: 'none' },
        React.createElement(Logo)
      )
    )
  ),
  children,
];

export default SiteLayout;
