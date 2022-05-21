export const addFavValue = (item) => {
  const list = JSON.parse(localStorage.getItem("favourites") || "[]");
  const isFav = isFavourite(list, item.id);
  if (isFav) {
    return { ...item, isFavourite: true };
  }
  return item;
};

export const isFavourite = (items = [], id) => {
  const isFav = items.find((elem) => id === elem.id);
  if (isFav) {
    return true;
  }
  return false;
};
