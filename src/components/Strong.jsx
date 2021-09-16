import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  strong: {
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

const Strong = ({ children }) => {
  const classes = useStyles();

  return <span className={classes.strong}>{children}</span>;
};

Strong.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Strong;
