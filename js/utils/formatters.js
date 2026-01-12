// 7 000 000 Р
const priceFormatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  maximumFractionDigits: 0,
});

// 7 000 000.45 Р
const priceFormatterDecimals = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  maximumFractionDigits: 2,
});

export { priceFormatter, priceFormatterDecimals };
