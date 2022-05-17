import React from 'react';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import { useSearchBox } from 'react-instantsearch-hooks-web';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch,SearchBox,Hits } from 'react-instantsearch-hooks-web';

const searchClient = algoliasearch('01ZCGVJMMX', '66bcc13d348eac437d89c68e2d5a2a76');

function Hit({ hit }) {
  return (
    <article>
      <h1>{hit.firstname}</h1>
    </article>
  );
}
const ariaLabel = { 'aria-label': 'description' };
function SearchBar(){
    return(
    <Box mb={2} >
        <InstantSearch searchClient={searchClient} indexName="instant_search">
            <Input placeholder="Search" inputProps={ariaLabel} />
            <Hits hitComponent={Hit} />
        </InstantSearch>
      
      
    </Box>
)
}
export default SearchBar;