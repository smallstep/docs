import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import queryString from 'query-string';
import Box from '@material-ui/core/Box';
import { useLocation } from '@reach/router';
import { Form, Formik } from 'formik';
import { Button } from '@smallstep/step-ui';

import ValidatedField from './ValidatedField';

const DynamicDocForm = ({ mt, mb, formFields }) => {
  const { pathname, search } = useLocation();
  const query = queryString.parse(search);

  return (
    <Box mt={mt} mb={mb}>
      <Formik
        initialValues={formFields.reduce((acc, { name }) => {
          return { ...acc, [name]: query[name] };
        })}
        onSubmit={(values) => {
          const queryString = formFields
            .filter(
              ({ name }) =>
                values[name] !== undefined && values[name].length > 0
            )
            .map(({ name }) => {
              return `${name}=${values[name]}`;
            })
            .join('&');
          navigate(`${pathname}?${queryString}`);
        }}
      >
        {({ submitForm }) => (
          <Form>
            {formFields.map((field) => (
              <Box key={field.name} mb={2}>
                <ValidatedField
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  placeholder={field.placeholder}
                />
              </Box>
            ))}
            <Box mt={mt} mb={mb}>
              <Button type="submit" onClick={submitForm}>
                Submit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

DynamicDocForm.propTypes = {
  mt: PropTypes.number,
  mb: PropTypes.number,
  formFields: PropTypes.array.isRequired,
};

DynamicDocForm.defaultProps = {
  mt: 4,
  mb: 4,
};

export default DynamicDocForm;
