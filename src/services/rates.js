export function getRates() {
  let rates = JSON.parse(localStorage.getItem('rates'));
  if (!rates) rates = [];
  return rates;
}

export function setRates(obj) {
  const rates = getRates();
  rates.push(obj);
  localStorage.setItem('rates', JSON.stringify(rates));
}
