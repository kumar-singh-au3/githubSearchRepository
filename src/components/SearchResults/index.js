import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { isFavourite } from "../../utils";
import List from "../List";


const Empty = (props) => {
  return <div className="noResultFound">No Results found, Try searching something else</div>;
};

const SearchResults = () => {
  const { searchResults = [], favouritesList = [] } = useSelector(
    (state) => ({
      searchResults: state.searchResults,
      favouritesList: state.favouritesList,
    })
  );

  if (!searchResults.length) {
    return <Empty />;
  }

  return (
    <div>
      {searchResults.map((item) => (
        <List
          key={item.id}
          item={item}
          isFav={isFavourite(favouritesList, item.id)}
        />
      ))}
    </div>
  );
};

export default SearchResults;
