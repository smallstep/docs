import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Heading } from '@smallstep/step-ui';

import { makeSlug } from '../utils';

const useStyles = makeStyles(theme => ({
  heading: {
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

const HN = ({ mt, mb, children }) => {
  const classes = useStyles();

  return (
    <Heading
      id={makeSlug(children)}
      component="h5"
      variant="body1"
      mt={mt}
      mb={mb}
      className={classes.heading}
    >
      {children}
    </Heading>
  );
};

HN.propTypes = {
  mt: PropTypes.number,
  mb: PropTypes.number,
  children: PropTypes.node.isRequired,
};

HN.defaultProps = {
  mt: 4,
  mb: 2,
};

export default HN;
