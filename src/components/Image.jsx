import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import Box from '@material-ui/core/Box';

const Image = ({ mt, mb, src, alt }) => (
  <Box component="span" mt={mt} mb={mb}>
    <img
      src={src}
      alt={alt}
      css={css`
        max-width: 100%;
      `}
    />
  </Box>
);

Image.propTypes = {
  mt: PropTypes.number,
  mb: PropTypes.number,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

Image.defaultProps = {
  mt: 4,
  mb: 4,
  alt: null,
};

export default Image;
