import algoliasearch from 'algoliasearch/lite';
import { default as React, useState, useMemo } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import { makeStyles, Box, List } from '@material-ui/core';
import SearchBox from './search-box';
import SearchResult from './search-result';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((classes) => ({
  resultsOpen: {
    background: 'white',
    position: 'relative',
  },
}));

export default function Search({ indices, changeOpenSearch }) {
  const classes = useStyles();
  const [query, setQuery] = useState();
  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
      ),
    []
  );
  const [openResults, setOpenResults] = React.useState(false);
  const [value, setValue] = useState();
  const handleClick = () => {
    changeOpenSearch(true);
    setOpenResults(true);
    setValue();
  };
  const handleClose = () => {
    changeOpenSearch(false);
    setOpenResults(false);
    setValue("");
  };
  return (
    <Box mb={2}>
      <InstantSearch
        searchClient={searchClient}
        indexName={indices[0].name}
        onSearchStateChange={({ query }) => setQuery(query)}
      >
        <SearchBox mt={2} 
          onInput={handleClick} 
          value={value}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" >
                <IconButton onClick={handleClose} edge="end" >
                  <ClearIcon style={{ fontSize: 30 }} />
                </IconButton>
              </InputAdornment>
            )
          }}
          
        />
        {openResults ? (
          <Box position={'relative'} mr={1}>
            <List
              className={classes.resultsOpen}
              disableAutoFocus={true}
              disableEnforceFocus={true}
            >
              
              <SearchResult
                show={query && query.length > 0 && openResults}
                indices={indices}
              />
            </List>
          </Box>
        ) : null}
      </InstantSearch>
    </Box>
  );
}
