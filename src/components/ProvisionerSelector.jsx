import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { Heading } from '@smallstep/step-ui';

const ProvisionerSelector = ({ provisioner, onProvisionerChange }) => (
  <FormControl component="fieldset">
    <Heading variant="h6" mb={2}>
      Show me instructions for...
    </Heading>
    <RadioGroup
      aria-label="provisioner"
      name="provisioner"
      value={provisioner}
      onChange={onProvisionerChange}
    >
      <FormControlLabel
        value="jwk"
        control={<Radio color="primary" />}
        label="Generic (password-based, etc.)"
      />
      <FormControlLabel
        value="acme"
        control={<Radio color="primary" />}
        label="ACME"
      />
    </RadioGroup>
  </FormControl>
);

export default ProvisionerSelector;
