import React from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';
import { TextField } from '@smallstep/step-ui';
import Box from '@mui/material/Box';

export default connectSearchBox(
  ({ refine, currentRefinement, className, onFocus }) => (
    <form className={className}>
      <Box
        component="form"
        sx= {{
          width: 350,
        }}
      >
        <TextField
          fullWidth
          className="SearchInput"
          type="text"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => refine(e.target.value)}
          value={currentRefinement}
          onFocus={onFocus}
        />
      </Box>
    </form>
  )
);
