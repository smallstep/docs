import React from 'react';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import { useSearchBox } from 'react-instantsearch-hooks-web';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch,SearchBox,Hits } from 'react-instantsearch-hooks-web';

const searchClient = algoliasearch('01ZCGVJMMX', '66bcc13d348eac437d89c68e2d5a2a76');

const ariaLabel = { 'aria-label': 'description' };
function SearchBar(){
    return(
    <Box mb={2} >
      <Input defaultValue="Search" inputProps={ariaLabel} />
      
    </Box>
)
}
export default SearchBar;