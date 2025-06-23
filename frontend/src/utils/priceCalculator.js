export const calculatePrice = (hours, tariff, discounts = { night: 0, rain: 0 }) => {
  const base = { hourly: 100, daily: 800, weekly: 4000 }[tariff];
  return base - (base * (discounts.night + discounts.rain));
};

export const getTariffOptions = () => [
  { id: 'hourly', label: 'Почасовой', price: 100 },
  { id: 'daily', label: 'Дневной', price: 800 },
  { id: 'weekly', label: 'Недельный', price: 4000 }
];

export const getDiscounts = () => ({
  night: 0.2, // 20% скидка ночью
  rain: 0.15  // 15% скидка в дождь
}); 