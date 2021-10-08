import React from 'react';
import { Link } from 'gatsby';
import { Box } from '@material-ui/core';
import { Container, Logo, Link as SuiLink } from '@smallstep/step-ui';

const SiteLayout = ({ children }) =>
  React.createElement(
    React.Fragment,
    null,
    React.createElement(
      Container,
      { size: 'md' },
      React.createElement(
        Box,
        { width: 200, my: 4 },
        React.createElement(
          SuiLink,
          { component: Link, to: '/', underline: 'none' },
          React.createElement(Logo)
        )
      )
    ),
    children
  );

export default SiteLayout;
