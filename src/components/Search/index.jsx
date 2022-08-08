import algoliasearch from 'algoliasearch/lite';
import { default as React, useState, useMemo } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import { makeStyles, Box, List, ClickAwayListener } from '@material-ui/core';
import SearchBox from './search-box';
import SearchResult from './search-result';

const useStyles = makeStyles((classes) => ({
  resultsOpen: {
    background: 'white',
    position: 'absolute',
  },
}));

export default function Search({ indices, changeOpenSearch }) {
  const [query, setQuery] = useState();
  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
      ),
    []
  );
  const classes = useStyles();
  const [openResults, setOpenResults] = React.useState(false);
  const handleClick = () => {
    changeOpenSearch(true);
    setOpenResults(true);
  };
  const handleClose = () => {
    changeOpenSearch(false);
    setOpenResults(false);
  };
  return (
    <Box mb={2}>
      <ClickAwayListener onClickAway={handleClose}>
        <InstantSearch
          searchClient={searchClient}
          indexName={indices[0].name}
          onSearchStateChange={({ query }) => setQuery(query)}
        >
          <SearchBox onInput={handleClick} mt={2} />
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
      </ClickAwayListener>
    </Box>
  );
}
