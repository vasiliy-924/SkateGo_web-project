import React, { useState, useEffect } from 'react';
import { calculatePrice, getTariffOptions, getDiscounts } from '../utils/priceCalculator';

const TariffSelector = ({ onSelect }) => {
  const [selectedTariff, setSelectedTariff] = useState('hourly');
  const [hours, setHours] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  
  const tariffOptions = getTariffOptions();
  const discounts = getDiscounts();
  
  // Проверяем время суток для ночной скидки
  const isNightTime = () => {
    const hour = new Date().getHours();
    return hour >= 22 || hour < 6;
  };
  
  // Расчет итоговой цены
  useEffect(() => {
    const activeDiscounts = {
      night: isNightTime() ? discounts.night : 0,
      rain: 0 // TODO: Добавить API погоды
    };
    
    const price = calculatePrice(hours, selectedTariff, activeDiscounts);
    setTotalPrice(price);
  }, [selectedTariff, hours]);

  const handleTariffChange = (tariff) => {
    setSelectedTariff(tariff);
    onSelect({ tariff, hours, price: totalPrice });
  };

  const handleHoursChange = (newHours) => {
    setHours(Math.max(1, Math.min(168, newHours))); // максимум 1 неделя
    onSelect({ tariff: selectedTariff, hours: newHours, price: totalPrice });
  };

  return (
    <div className="tariff-selector">
      <h3>Выберите тариф</h3>
      
      <div className="tariff-options">
        {tariffOptions.map(option => (
          <button
            key={option.id}
            className={`tariff-button ${selectedTariff === option.id ? 'active' : ''}`}
            onClick={() => handleTariffChange(option.id)}
          >
            <span className="tariff-label">{option.label}</span>
            <span className="tariff-price">{option.price}₽</span>
          </button>
        ))}
      </div>

      {selectedTariff === 'hourly' && (
        <div className="hours-selector">
          <label>Количество часов:</label>
          <input
            type="number"
            min="1"
            max="24"
            value={hours}
            onChange={(e) => handleHoursChange(parseInt(e.target.value))}
          />
        </div>
      )}

      <div className="price-summary">
        <p>Итоговая стоимость: {totalPrice}₽</p>
        {isNightTime() && (
          <p className="discount-note">Применена ночная скидка {discounts.night * 100}%</p>
        )}
      </div>
    </div>
  );
};

export default TariffSelector; 