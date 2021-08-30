import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { useTheme } from '@material-ui/styles';

const Strong = ({ children }) => {
  const theme = useTheme();

  return (
    <span
      css={css`
        font-weight: ${theme.typography.fontWeightMedium};
      `}
    >
      {children}
    </span>
  );
};

Strong.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Strong;
