import algoliasearch from 'algoliasearch/lite';
import { createRef, default as React, useState, useMemo } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import { Box } from '@material-ui/core';
import { ThemeProvider, makeStyles } from '@material-ui/core'
import SearchBox from './search-box';
import SearchResult from './search-result';
//import useClickOutside from './use-click-outside';
import Popover from '@material-ui/core/Popover';

// const theme = {
//   foreground: '#050505',
//   background: 'white',
//   faded: '#888',
// };
const useStyles = makeStyles({
  root: {
    background: 'white',
  },
  pop: {
    borderRadius: 15,
    maxHeight: 600,
    maxWidth: 550,
    marginTop: 18,
  }
});

export default function Search({ indices }) {
  const rootRef = createRef();
  const [query, setQuery] = useState();
  const [hasFocus, setFocus] = useState(false);
  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
      ),
    []
  );

  //useClickOutside(rootRef, () => setFocus(false));
  const theme = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <ThemeProvider theme={theme.root}>
      <Box  ref={rootRef} mb={1.6} >
        <InstantSearch
          searchClient={searchClient}
          indexName={indices[0].name}
          onSearchStateChange={({ query }) => setQuery(query)}
        >
          <SearchBox onInput = {handleClick} onFocus = {() => setFocus(true)} hasFocus={hasFocus}/>
            { hasFocus ? 
            <Popover 
              className={theme.pop}
              id={id} 
              open={open} 
              anchorEl={anchorEl}
              onClose={handleClose}
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
                show={query && query.length > 0 && hasFocus}
                indices={indices} />
            </Popover>  : null }
        </InstantSearch>
      </Box>
    </ThemeProvider>
  );
}
