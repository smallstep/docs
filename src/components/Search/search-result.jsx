import { Link } from 'gatsby';
import { default as React } from 'react';
import { Tile, Paragraph } from '@smallstep/step-ui';
import {
  connectStateResults,
  Highlight,
  Hits,
  Index,
  Snippet,
} from 'react-instantsearch-dom';
import { makeStyles } from '@material-ui/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
  HitCount: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  hits: {
    marginLeft: -30,
    '& ul ': {
      listStyle: 'none',
    },
  },
});

const HitCount = connectStateResults(({ searchResults }) => {
  const hitCount = searchResults && searchResults.nbHits;
  const classes = useStyles();
  return hitCount > 0 ? (
    <div className={classes.HitCount}>
      {hitCount} result{hitCount !== 1 ? `s` : ``}
    </div>
  ) : null;
});

const PageHit = ({ hit }) => (
  <Box mb={1}>
    <Tile>
      <Link
        to={
          hit.title[0] === hit.title[0].toUpperCase()
            ? `/docs/${hit.slug}`
            : `/docs/step-cli/reference/${hit.slug}`
        }
      >
        <Paragraph>
          <Highlight attribute="title" hit={hit} tagName="mark" />
        </Paragraph>
      </Link>
      <Snippet attribute="excerpt" hit={hit} tagName="mark" />
    </Tile>
  </Box>
);

function HitsInIndex({ index }) {
  const classes = useStyles();
  return (
    <Index indexName={index.name}>
      <HitCount />
      <Hits className={classes.hits} hitComponent={PageHit} />
    </Index>
  );
}

const SearchResult = ({ indices, className }) => (
  <div className={className}>
    {indices.map((index) => (
      <Paragraph>
        <HitsInIndex index={index} key={index.name} />
      </Paragraph>
    ))}
  </div>
);

export default SearchResult;
