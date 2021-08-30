import React from 'react';
import PropTypes from 'prop-types';
import { Paragraph } from '@smallstep/step-ui';

const Li = ({ children }) => (
  <Paragraph component="li" mb={0}>
    {children}
  </Paragraph>
);

Li.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Li;
