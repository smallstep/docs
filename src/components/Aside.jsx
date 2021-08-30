import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { useTheme } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import { Paragraph } from '@smallstep/step-ui';

const Aside = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      component="aside"
      m={8}
      p={4}
      css={css`
        background-color: ${theme.palette.background.cream};
      `}
    >
      <Paragraph component="div" mb={0}>
        {children}
      </Paragraph>
    </Box>
  );
};

Aside.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Aside;
