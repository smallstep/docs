import React from 'react';
import PropTypes from 'prop-types';

import HBase from './HBase';

const H3 = ({ mt, mb, children }) => (
  <HBase component="h4" variant="subtitle2" color="blue" mt={mt} mb={mb}>
    {children}
  </HBase>
);

H3.propTypes = {
  mt: PropTypes.number,
  mb: PropTypes.number,
  children: PropTypes.node.isRequired,
};

H3.defaultProps = {
  mt: 4,
  mb: 2,
};

export default H3;
