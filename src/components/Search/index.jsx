import algoliasearch from 'algoliasearch/lite';
import { default as React, useState, useMemo } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import { ThemeProvider, makeStyles, Box, List, ClickAwayListener } from '@material-ui/core';
import SearchBox from './search-box';
import SearchResult from './search-result';

const useStyles = makeStyles({
  root: {
    background: 'white',
  },
  popover: {
    //borderRadius: 15,
    position: 'relative',
    maxHeight: '75%',
    width: 'auto',
    height: 'auto',
    boxShadow: 5,
    marginTop: 15,
  },
  hits: {
  },
});

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
  const theme = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClick = (event) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <ThemeProvider theme={theme.root}>
      <Box mb={2}>
      <ClickAwayListener onClickAway={handleClose}>
        <InstantSearch
          searchClient={searchClient}
          indexName={indices[0].name}
          onSearchStateChange={({ query }) => setQuery(query)}
        >
          <SearchBox onInput={handleClick} />
          {window.addEventListener('resize', handleClose)}
          {open ? (
            <List
              className={theme.popover}
              disableAutoFocus={true}
              disableEnforceFocus={true}
            >
              <SearchResult
                  className={theme.hits}
                  show={query && query.length > 0 && open}
                  indices={indices}
                />
            </List>
          ) : null}
        </InstantSearch>
      </ClickAwayListener>
      </Box>
    </ThemeProvider>
  );
}
