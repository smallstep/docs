import algoliasearch from 'algoliasearch/lite';
import { createRef, default as React, useState, useMemo } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import { ThemeProvider, makeStyles, Box, Popover } from '@material-ui/core';
import SearchBox from './search-box';
import SearchResult from './search-result';

const useStyles = makeStyles({
  root: {
    background: 'white',
  },
  popover: {
    borderRadius: 15,
    height: 'auto',
    position: 'absolute',
    maxHeight: '80%',
    width: 'auto',
    boxShadow: 5,
    marginTop: 15,
  },
  hits: {
    width: 350,
  },
});

export default function Search({ indices }) {
  const rootRef = createRef();
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
  const [hasFocus, setFocus] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setFocus(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setFocus(false);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <ThemeProvider theme={theme.root}>
      <Box ref={rootRef} mb={1.6}>
        <InstantSearch
          searchClient={searchClient}
          indexName={indices[0].name}
          onSearchStateChange={({ query }) => setQuery(query)}
        >
          <SearchBox onInput={handleClick} />
          {hasFocus ? (
            <Popover
              className={theme.popover}
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              disableAutoFocus={true}
              disableEnforceFocus={true}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <SearchResult
                className={theme.hits}
                show={query && query.length > 0 && hasFocus}
                indices={indices}
              />
            </Popover>
          ) : null}
        </InstantSearch>
      </Box>
    </ThemeProvider>
  );
}
