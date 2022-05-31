import { Link } from 'gatsby';
import React from 'react';
import { Tile, Paragraph } from '@smallstep/step-ui';
import {
  connectStateResults,
  Highlight,
  Hits,
  Index,
  Snippet,
} from 'react-instantsearch-dom';

const HitCount = connectStateResults(({ searchResults }) => {
  const hitCount = searchResults && searchResults.nbHits;

  return hitCount > 0 ? (
    <div className="HitCount">
      {hitCount} result{hitCount !== 1 ? `s` : ``}
    </div>
  ) : null;
});

const PageHit = ({ hit }) => (
  <div>
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
  </div>
);

const HitsInIndex = ({ index }) => (
  <Index indexName={index.name}>
    <HitCount />
    <Hits className="Hits" hitComponent={PageHit} />
  </Index>
);

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