import algoliasearch from 'algoliasearch/lite';
import { createRef, default as React, useState, useMemo } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import { ThemeProvider, createTheme, Box } from '@mui/system';
import SearchBox from './search-box';
import SearchResult from './search-result';
import useClickOutside from './use-click-outside';

// const theme = {
//   foreground: '#050505',
//   background: 'white',
//   faded: '#888',
// };

const theme = createTheme({
  sx: {
    foreground: '#050505',
    background: 'white',
    faded: '#888',
  }
})

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

  useClickOutside(rootRef, () => setFocus(false));
  return (
    <ThemeProvider theme={theme}>
        <Box ref={rootRef} sx = {{position: "relative",marginBottom: 1.6,}} >
          <InstantSearch
            searchClient={searchClient}
            indexName={indices[0].name}
            onSearchStateChange={({ query }) => setQuery(query)}
          >
            <SearchBox onFocus = {() => setFocus(true)} hasFocus={hasFocus}/>
              { hasFocus ? <SearchResult
                  show={query && query.length > 0 && hasFocus}
                  indices={indices} /> : null }
          </InstantSearch>
        </Box>
      </ThemeProvider>
  );
}
