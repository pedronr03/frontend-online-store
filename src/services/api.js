export async function getCategories() {
  const request = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const json = await request.json();
  return json;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const request = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const json = await request.json();
  return json;
}

export async function getProductById(id) {
  const request = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const json = await request.json();
  return json;
}
