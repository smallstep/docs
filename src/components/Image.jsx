import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(() => ({
  image: {
    maxWidth: '100%',
  },
}));

const Image = ({ mt, mb, src, alt }) => {
  const classes = useStyles();

  return (
    <Box component="span" mt={mt} mb={mb}>
      <img src={src} alt={alt} className={classes.image} />
    </Box>
  );
};

Image.propTypes = {
  mt: PropTypes.number,
  mb: PropTypes.number,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

Image.defaultProps = {
  mt: 4,
  mb: 4,
  alt: null,
};

export default Image;
