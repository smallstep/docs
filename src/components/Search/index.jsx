import algoliasearch from 'algoliasearch/lite';
import { default as React, useState, useMemo } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import { makeStyles, Box, List, Popover } from '@material-ui/core';
import SearchBox from './search-box';
import SearchResult from './search-result';

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'white',
  },
  popover: {
    maxWidth: 420,
    maxHeight: 580,
    overflow: 'auto',
    overflowX: 'hidden',
  },
});

export default function Search({ indices }) {
  const [query, setQuery] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
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
  const handleInput = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box mb={4}>
      <InstantSearch
        searchClient={searchClient}
        indexName={indices[0].name}
        onSearchStateChange={({ query }) => setQuery(query)}
      >
        <SearchBox onInput={handleInput} />
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          disableAutoFocus
          disableEnforceFocus
          classes={{ paper: classes.popover }}
        >
          <Box px={2} py={1}>
            <List>
              <SearchResult
                show={query && query.length > 0 && open}
                indices={indices}
              />
            </List>
          </Box>
        </Popover>
      </InstantSearch>
    </Box>
  );
}
