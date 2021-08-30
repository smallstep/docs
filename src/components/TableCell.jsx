import React from 'react';
import PropTypes from 'prop-types';
import MuiTableCell from '@material-ui/core/TableCell';

const TableCell = ({ align, ...props }) => (
  <MuiTableCell align={align || 'left'} {...props} />
);

TableCell.propTypes = {
  align: PropTypes.string,
};

TableCell.defaultProps = {
  align: 'left',
};

export default TableCell;
