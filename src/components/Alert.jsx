import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = ({ mt, mb, ...props }) => (
  <Box mt={mt} mb={mb}>
    <MuiAlert {...props} />
  </Box>
);

Alert.propTypes = {
  mt: PropTypes.number,
  mb: PropTypes.number,
};

Alert.defaultProps = {
  mt: 0,
  mb: 2,
};

export default Alert;
