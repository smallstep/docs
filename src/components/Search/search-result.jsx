import { Link } from 'gatsby';
import { default as React } from 'react';
import { Paragraph } from '@smallstep/step-ui';
import { makeStyles } from '@material-ui/styles';
import {
  connectStateResults,
  Highlight,
  Hits,
  Index,
  Snippet,
} from 'react-instantsearch-dom';
import { Box, ListItem, ListItemText } from '@material-ui/core';

const useStyles = makeStyles({
  resultsBorder: {
    borderColor: '#D3D3D3',
    marginBottom: -16,
    marginTop: -2,
  },
  hits: {
    marginLeft: -30,
    marginRight: 10,
    '& mark ': {
      backgroundColor: '#84A8FF',
    },
    '& ul ': {
      listStyle: 'none',
    },
    '& a:-webkit-any-link ': {
      textDecoration: 'none',
      color: 'inherit',
    },
  },
});

const HitCount = connectStateResults(({ searchResults }) => {
  const hitCount = searchResults && searchResults.nbHits;
  const theme = useStyles();
  return hitCount > 0 ? (
    <Box borderBottom={1} textAlign={'right'} className={theme.resultsBorder} >
      <Box mr={2}>
        {hitCount} result{hitCount !== 1 ? `s` : ``}
      </Box> 
    </Box>
  ) : (
    <Box className={theme.resultsBorder} minWidth={295} textAlign={'left'} ml={0.5} >
      There are no results found
    </Box>
  );
});

const PageHit = ({ hit }) => (
  <Box mx={-2}>
    <Link
      to={
        hit.title[0] === hit.title[0].toUpperCase()
          ? `/docs/${hit.slug}`
          : `/docs/step-cli/reference/${hit.slug}`
      }
    >
      <ListItem button attribute="slug" hit={hit} tagName="mark">
        <ListItemText
          primary={
            <h4>
              <Highlight attribute="title" hit={hit} tagName="mark" />
            </h4>
          }
          secondary={
            <Paragraph>
              <Snippet attribute="excerpt" hit={hit} tagName="mark" />
            </Paragraph>
          }
        />
      </ListItem>
    </Link>
  </Box>
);

function HitsInIndex({ index }) {
  const theme = useStyles();
  return (
    <Index indexName={index.name}>
      <Paragraph>
        <HitCount />
      </Paragraph>
      <Hits className={theme.hits} hitComponent={PageHit} />
    </Index>
  );
}

const SearchResult = ({ indices, className }) => (
  <Box className={className}>
    {indices.map((index) => (
      <Paragraph>
        <HitsInIndex index={index} key={index.name} />
      </Paragraph>
    ))}
  </Box>
);

export default SearchResult;
