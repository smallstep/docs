import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Paragraph } from '@smallstep/step-ui';

const useStyles = makeStyles((theme) => ({
  aside: {
    backgroundColor: theme.palette.background.cream,
  },
}));

const Aside = ({ children }) => {
  const classes = useStyles();

  return (
    <Box component="aside" m={6} p={4} className={classes.aside}>
      <Paragraph component="div" mb={0}>
        {children}
      </Paragraph>
    </Box>
  );
};

Aside.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Aside;
