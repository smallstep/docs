import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Link } from '@smallstep/step-ui';

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'none',
  },
}));

const Reference = ({ id, marker }) => {
  const classes = useStyles();

  return (
    <Link href={`#${id}`} className={classes.link}>
      <sup>{marker}</sup>
    </Link>
  );
};

Reference.propTypes = {
  id: PropTypes.string.isRequired,
  marker: PropTypes.string.isRequired,
};

export default Reference;
