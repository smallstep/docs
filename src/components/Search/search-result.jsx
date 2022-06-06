import { Link } from 'gatsby';
import { default as React } from 'react';
import { Tile, Paragraph } from '@smallstep/step-ui';
import { makeStyles } from '@material-ui/styles';
import { Box } from '@material-ui/core';
import {
  connectStateResults,
  Highlight,
  Hits,
  Index,
  Snippet,
} from 'react-instantsearch-dom';
import { ListItem, ListItemText } from '@material-ui/core';

const useStyles = makeStyles({
  hits: {
    marginLeft: -30,
    marginRight: 10,
    '& ul ': {
      listStyle: 'none',
    },
  },
});

const HitCount = connectStateResults(({ searchResults }) => {
  const hitCount = searchResults && searchResults.nbHits;

  return hitCount >= 0 ? (
    <div className="HitCount">
      {hitCount} result{hitCount !== 1 ? `s` : ``}
    </div>
  ) : null;
});

const PageHit = ({ hit }) => (
  <Box mb={0.5}>
    <ListItem>
      <ListItemText
      primary= {
        <Link
          to={
            hit.title[0] === hit.title[0].toUpperCase()
              ? `/docs/${hit.slug}`
              : `/docs/step-cli/reference/${hit.slug}`
          }
        >
          <h4>
            <Highlight attribute="title" hit={hit} tagName="mark" />
          </h4>
        </Link>
      }
      secondary = {
        <Paragraph>
          <Snippet attribute="excerpt" hit={hit} tagName="mark" />
        </Paragraph>
      }
      />
    </ListItem>
  </Box>
);

function HitsInIndex({ index }) {
  const classes = useStyles();
  return (
    <Index indexName={index.name}>
      <Box ml={1.6} mt={-1.6} mb={-1.6}>
        <h4>
          <HitCount />
        </h4>
      </Box>
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
