import React from "react";
import { useDispatch } from "react-redux";
import { makeFavourite, removeFavourite } from "../../actions";
import ListItem from "./ListItem";

const List = ({ item = {}, isFav }) => {
  const dispatch = useDispatch();
  const { isFavourite = isFav || false } = item;
  const onFavClick = (item, isFavourite) => {
    if (isFavourite) {
      dispatch(removeFavourite(item.id));
    } else {
      dispatch(makeFavourite({ ...item, isFavourite: true }));
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <ListItem item = {item} onFavClick = {onFavClick} isFavourite = {isFavourite}/>
    </div>
  );
};

export default List