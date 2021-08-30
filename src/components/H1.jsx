import React from 'react';
import PropTypes from 'prop-types';

import HBase from './HBase';

const H1 = ({ children }) => (
  <HBase component="h2" variant="h2">
    {children}
  </HBase>
);

H1.propTypes = {
  children: PropTypes.node.isRequired,
};

export default H1;
