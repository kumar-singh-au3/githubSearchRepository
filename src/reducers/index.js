import { combineReducers } from "redux";
import searchResults from "./searchResults";
import favouritesList from './favourites';

export default combineReducers({
    searchResults,
    favouritesList
})