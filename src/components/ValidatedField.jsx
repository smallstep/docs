import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Field } from 'formik';
import { FormControlLabel, TextField } from '@smallstep/step-ui';

const ValidatedField = ({
  label,
  type,
  name,
  placeholder,
  error,
  touched,
  inputRef,
  ...props
}) => {
  const shouldDisplayError = !!(touched && error);

  return (
    <FormControl fullWidth error={shouldDisplayError}>
      <FormControlLabel
        fullWidth
        label={label}
        control={
          <Field
            component={TextField}
            type={type}
            name={name}
            fullWidth
            placeholder={placeholder}
            error={shouldDisplayError}
            inputRef={inputRef}
            {...props}
          />
        }
      />
      {shouldDisplayError && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

ValidatedField.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool,
  inputRef: PropTypes.func,
};

ValidatedField.defaultProps = {
  type: 'text',
  placeholder: '',
  error: '',
  touched: false,
  inputRef: undefined,
};

export default ValidatedField;
