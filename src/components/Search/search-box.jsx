import React from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';
import { TextField } from '@smallstep/step-ui';
import { Box } from '@material-ui/core';

export default connectSearchBox(
  ({ refine, value, onFocus, onInput, InputProps }) => (
    <Box component="form" mr={3}>
      <TextField
        fullWidth
        className="SearchInput"
        type="text"
        placeholder="Search"
        aria-label="Search"
        onChange={(e) => refine(e.target.value)}
        value={value}
        onFocus={onFocus}
        onInput={onInput}
        InputProps={InputProps}
      />
    </Box>
  )
);
