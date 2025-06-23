import React, { useState, useEffect } from 'react';
import api from '../services/api';

const UserStats = () => {
  const [stats, setStats] = useState({
    totalRentals: 0,
    avgDuration: '0 ч',
    totalDistance: 0,
    discount: 0,
    totalSpent: 0,
    penalties: 0
  });

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      const response = await api.get('/user/stats/');
      const data = response.data;
      
      setStats({
        totalRentals: data.total_rentals,
        avgDuration: `${Math.round(data.avg_duration_hours * 10) / 10} ч`,
        totalDistance: Math.round(data.total_distance / 100) / 10, // км
        discount: data.total_rentals > 10 ? 10 : 0,
        totalSpent: data.total_spent,
        penalties: data.total_penalties
      });
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  return (
    <div className="user-stats">
      <h2>Ваша статистика</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🛹</div>
          <div className="stat-value">{stats.totalRentals}</div>
          <div className="stat-label">Всего поездок</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-value">{stats.avgDuration}</div>
          <div className="stat-label">Средняя длительность</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📍</div>
          <div className="stat-value">{stats.totalDistance} км</div>
          <div className="stat-label">Общее расстояние</div>
        </div>

        {stats.discount > 0 && (
          <div className="stat-card discount">
            <div className="stat-icon">🎉</div>
            <div className="stat-value">{stats.discount}%</div>
            <div className="stat-label">Ваша скидка</div>
          </div>
        )}

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-value">{stats.totalSpent}₽</div>
          <div className="stat-label">Потрачено всего</div>
        </div>

        {stats.penalties > 0 && (
          <div className="stat-card penalties">
            <div className="stat-icon">⚠️</div>
            <div className="stat-value">{stats.penalties}₽</div>
            <div className="stat-label">Штрафы</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserStats; 