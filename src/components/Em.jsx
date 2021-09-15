import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  em: {
    fontStyle: 'italic',
  },
});

const Em = ({ children }) => {
  const classes = useStyles();

  return <span className={classes.em}>{children}</span>;
};

Em.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Em;
