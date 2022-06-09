import algoliasearch from 'algoliasearch/lite';
import { default as React, useState, useMemo } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import {
  ThemeProvider,
  makeStyles,
  Box,
  List,
  ClickAwayListener,
} from '@material-ui/core';
import SearchBox from './search-box';
import SearchResult from './search-result';

const useStyles = makeStyles({
  root: {
    background: 'white',
  },
  popover: {
    background: 'white',
    position: 'absolute',
    maxHeight: 750,
    width: 'auto',
    height: 'auto',
    overflow: 'scroll',
    overflowX: 'hidden',
    boxShadow: 5,
    zIndex: 2,
  },
  hits: {
    borderRadius: 3,
    borderColor: '#D3D3D3',
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
              <Box position={'relative'} zIndex={2} mr={3} mt={2} >
                <List
                  className={theme.popover}
                  disableAutoFocus={true}
                  disableEnforceFocus={true}
                >
                  <SearchResult
                    show={query && query.length > 0 && open}
                    indices={indices}
                  />
                </List>
              </Box>
            ) : null}
          </InstantSearch>
        </ClickAwayListener>
      </Box>
    </ThemeProvider>
  );
}
