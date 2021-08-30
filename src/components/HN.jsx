import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { useTheme } from '@material-ui/core/styles';
import { Heading } from '@smallstep/step-ui';

import { makeSlug } from '../utils';

const HN = ({ mt, mb, children }) => {
  const theme = useTheme();

  return (
    <Heading
      id={makeSlug(children)}
      component="h5"
      variant="body1"
      mt={mt}
      mb={mb}
      css={css`
        font-weight: ${theme.typography.fontWeightMedium};
      `}
    >
      {children}
    </Heading>
  );
};

HN.propTypes = {
  mt: PropTypes.number,
  mb: PropTypes.number,
  children: PropTypes.node.isRequired,
};

HN.defaultProps = {
  mt: 4,
  mb: 2,
};

export default HN;
