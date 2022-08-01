import algoliasearch from 'algoliasearch/lite';
import { default as React, useState, useMemo } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import { makeStyles, Box, List, ClickAwayListener } from '@material-ui/core';
import SearchBox from './search-box';
import SearchResult from './search-result';

const useStyles = makeStyles((theme) => ({
  resultsOpen: {
    background: 'white',
    position: 'relative',
  },
  resultsBorder: {
    border: `1px solid ${theme.palette.divider}`,
    maxHeight: 580,
    overflow: 'auto',
    overflowX: 'hidden',
  },
}));

export default function Search({ indices }) {
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
  const [open, setOpen] = React.useState(false);
  const handleClick = (event) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
          {open ? (
            <Box position={'relative'} mr={1} >
              <List
                className={classes.resultsOpen}
                disableAutoFocus={true}
                disableEnforceFocus={true}
              >
                <Box className={classes.resultsBorder}>
                  <SearchResult
                    show={query && query.length > 0 && open}
                    indices={indices}
                  />
                </Box>
              </List>
            </Box>
          ) : null}
        </InstantSearch>
      </ClickAwayListener>
    </Box>
  );
}
