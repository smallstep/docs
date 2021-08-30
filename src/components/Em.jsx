import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

const Em = ({ children }) => (
  <span
    css={css`
      font-style: italic;
    `}
  >
    {children}
  </span>
);

Em.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Em;
