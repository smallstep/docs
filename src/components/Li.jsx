import React from 'react';
import PropTypes from 'prop-types';
import { Paragraph } from '@smallstep/step-ui';

const Li = ({ variant, children }) => (
  <Paragraph variant={variant} component="li" mb={0}>
    {children}
  </Paragraph>
);

Li.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Li.defaultProps = {
  variant: 'body1',
};

export default Li;
