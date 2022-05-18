import React, { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import PropTypes from "prop-types";
import "./SearchBar.css";
import { InstantSearch,
  SearchBox,
  Hits,
  Highlight, 
} from 'react-instantsearch-hooks-web';

const searchClient = algoliasearch('********', '****************');

const ariaLabel = { 'aria-label': 'description' };
function SearchBar(){
  const [filteredData, setFilteredData] = useState([]);
    return(
      <div className='search'>
        <InstantSearch searchClient={searchClient} indexName="instant_search" >
          <SearchBox placeholder="Search" inputProps={ariaLabel} />
          {filteredData.length != 0 && (
            <div className='dataResult'>
              <p>
                <Hits hitComponent={Hit} />
              </p>
            </div>
          )}
        </InstantSearch>
      </div>
  );
}
function Hit(props) {
  return (
    <Highlight attribute="firstname" hit={props.hit} />
  );
}
Hit.propTypes = {
  hit: PropTypes.object.isRequired
};

function App(){
  return <div className='App'>
    <SearchBar />
  </div>;
}

export default App;