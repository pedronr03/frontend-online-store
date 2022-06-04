export function getCart() {
  let favorites = JSON.parse(localStorage.getItem('favorites'));
  if (!favorites) favorites = [];
  return favorites;
}

export function remove(item) {
  const favorites = getCart();
  const search = favorites.find((favorite) => favorite.title === item.title);
  const index = favorites.indexOf(search);
  favorites.splice(index, 1);
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

export function updateCart(item, value) {
  const favorites = getCart();
  const search = favorites.find((favorite) => favorite.title === item.title);
  const index = favorites.indexOf(search);
  if (value > 0) {
    if (search) {
      search.quantidade += value;
      favorites[index] = search;
    } else {
      item.quantidade = value;
      favorites.push(item);
    }
  } else {
    if (favorites[index].quantidade === 1) {
      remove(item);
      return;
    }
    favorites[index].quantidade += value;
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
}
