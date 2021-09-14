import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: theme.spacing(3),
  },
  text: {
    fontSize: theme.typography.body2.fontSize,
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

const Footnote = ({ id, marker, children }) => {
  const classes = useStyles();

  return (
    <Box id={id} mt={2}>
      <Box display="inline-block" className={classes.wrapper}>
        <span className={classes.text}>{marker}</span>
      </Box>
      {children}
    </Box>
  );
};

Footnote.propTypes = {
  id: PropTypes.string.isRequired,
  marker: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  children: PropTypes.node.isRequired,
};

export default Footnote;
