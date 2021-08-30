import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { Link } from '@smallstep/step-ui';

const Reference = ({ id, marker }) => (
  <Link
    href={`#${id}`}
    css={css`
      text-decoration: none;
    `}
  >
    <sup>{marker}</sup>
  </Link>
);

Reference.propTypes = {
  id: PropTypes.string.isRequired,
  marker: PropTypes.string.isRequired,
};

export default Reference;
