import React, { useState, useEffect } from 'react';
import api from '../services/api';

const CurrentRentals = () => {
  const [rentals, setRentals] = useState([]);
  const [timers, setTimers] = useState({});

  useEffect(() => {
    fetchCurrentRentals();
    const interval = setInterval(updateTimers, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchCurrentRentals = async () => {
    try {
      const response = await api.get('/rentals/current/');
      setRentals(response.data);
      
      // Инициализация таймеров
      const initialTimers = {};
      response.data.forEach(rental => {
        const startTime = new Date(rental.start_time);
        const elapsedTime = Math.floor((new Date() - startTime) / 1000);
        initialTimers[rental.id] = elapsedTime;
      });
      setTimers(initialTimers);
    } catch (error) {
      console.error('Error fetching current rentals:', error);
    }
  };

  const updateTimers = () => {
    setTimers(prevTimers => {
      const newTimers = { ...prevTimers };
      Object.keys(newTimers).forEach(id => {
        newTimers[id] += 1;
      });
      return newTimers;
    });
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="current-rentals">
      <h2>Текущие аренды</h2>
      {rentals.length === 0 ? (
        <p>У вас нет активных аренд</p>
      ) : (
        <div className="rentals-grid">
          {rentals.map(rental => (
            <div key={rental.id} className="rental-card">
              <div className="rental-header">
                <h3>Скейтборд #{rental.skateboard_id}</h3>
                <span className={`battery-level ${rental.battery_level < 20 ? 'low' : ''}`}>
                  🔋 {rental.battery_level}%
                </span>
              </div>
              
              <div className="rental-info">
                <p>Тариф: {rental.tariff}</p>
                <p>Начало: {new Date(rental.start_time).toLocaleString()}</p>
                <div className="timer">
                  Прошло времени: {formatTime(timers[rental.id] || 0)}
                </div>
              </div>

              <div className="rental-footer">
                <p className="price">
                  Текущая стоимость: {rental.current_price}₽
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrentRentals; 