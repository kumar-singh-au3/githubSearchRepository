const initialState= JSON.parse(localStorage.getItem("favourites") || "[]");

const favouritesList = (state = initialState, action = {}) => {
  switch (action.type) {
    case "add_favourites":
      const addedFavourites = [...state, action.payload];
      localStorage.setItem("favourites", JSON.stringify(addedFavourites));
      return addedFavourites;
    case "remove_favourites":
      const removedFavourites = state.filter((item) => item.id !== action.payload);
      localStorage.setItem("favourites", JSON.stringify(removedFavourites));
      return removedFavourites;
    case "import_favourites":
      localStorage.removeItem("favourites")
      localStorage.setItem("favourites", JSON.stringify(action.payload));
      return action.payload  
    default:
      return state;
  }
};
export default favouritesList;
