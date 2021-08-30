import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import MuiTable from '@material-ui/core/Table';

const Table = ({ mt, mb, ...props }) => (
  <Box mt={mt} mb={mb}>
    <MuiTable {...props} />
  </Box>
);

Table.propTypes = {
  mt: PropTypes.number,
  mb: PropTypes.number,
};

Table.defaultProps = {
  mt: 0,
  mb: 4,
};

export default Table;
