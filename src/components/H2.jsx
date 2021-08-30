import React from 'react';
import PropTypes from 'prop-types';

import HBase from './HBase';

const H2 = ({ mt, mb, children }) => (
  <HBase component="h3" variant="h3" mt={mt} mb={mb}>
    {children}
  </HBase>
);

H2.propTypes = {
  mt: PropTypes.number,
  mb: PropTypes.number,
  children: PropTypes.node.isRequired,
};

H2.defaultProps = {
  mt: 4,
  mb: 2,
};

export default H2;
