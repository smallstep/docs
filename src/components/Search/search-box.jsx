import React from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';
import { TextField } from '@smallstep/step-ui';
import { Box } from '@material-ui/core';

export default connectSearchBox(
  ({ refine, currentRefinement, className, onFocus, onInput }) => (
    <form className={className}>
      <Box component="form" width={350}>
        <TextField
          fullWidth
          className="SearchInput"
          type="text"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => refine(e.target.value)}
          value={currentRefinement}
          onFocus={onFocus}
          onInput={onInput}
        />
      </Box>
    </form>
  )
);
