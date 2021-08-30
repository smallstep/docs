import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { useTheme } from '@material-ui/styles';
import Box from '@material-ui/core/Box';

const Footnote = ({ id, marker, children }) => {
  const theme = useTheme();

  return (
    <Box id={id} mt={2}>
      <Box display="inline-block" width={theme.spacing(3)}>
        <span
          css={css`
            font-size: ${theme.typography.body2.fontSize};
            font-weight: ${theme.typography.fontWeightMedium};
          `}
        >
          {marker}
        </span>
      </Box>
      {children}
    </Box>
  );
};

Footnote.propTypes = {
  id: PropTypes.string.isRequired,
  marker: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  children: PropTypes.node.isRequired,
};

export default Footnote;
