import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CurrentRentals from '../components/CurrentRentals';
import RentalHistory from '../components/RentalHistory';
import UserStats from '../components/UserStats';
import { Card, Button } from '../components/UI';
import { requestNotificationPermission, registerServiceWorker } from '../services/notifications';
import { cardVariants } from '../theme/animations';
import './ProfilePage.css';

// Временные моковые данные
const MOCK_USER = {
  name: "Александр",
  email: "alex@example.com",
  avatar: null, // URL аватара будет добавлен позже
  joinDate: "2024-01-15",
  stats: {
    totalRides: 42,
    totalDistance: 168,
    averageRating: 4.8,
    favoriteZones: ["Парк Горького", "Музеон", "Воробьевы горы"]
  },
  achievements: [
    { id: 1, title: "Первая поездка", icon: "🛹", description: "Совершите свою первую поездку" },
    { id: 2, title: "Городской исследователь", icon: "🗺️", description: "Посетите 5 разных зон катания" },
    { id: 3, title: "Ночной райдер", icon: "🌙", description: "Совершите поездку после заката" },
    { id: 4, title: "Марафонец", icon: "🏃", description: "Проедьте более 100 км" }
  ]
};

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('stats');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // В будущем здесь будет API запрос
    setTimeout(() => {
      setUser(MOCK_USER);
      setLoading(false);
    }, 500);

    // Запрашиваем разрешение на уведомления при первом посещении профиля
    const setupNotifications = async () => {
      const permissionGranted = await requestNotificationPermission();
      if (permissionGranted) {
        await registerServiceWorker();
      }
    };
    
    setupNotifications();
  }, []);

  if (loading) {
    return (
      <div className="profile-page loading">
        <div className="skeleton-loader"></div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <motion.div 
        className="profile-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="user-info">
          <div className="avatar-container">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="user-avatar" />
            ) : (
              <div className="avatar-placeholder">
                {user.name.charAt(0)}
              </div>
            )}
            <button className="edit-avatar-btn">
              <span>📷</span>
            </button>
          </div>
          <div className="user-details">
            <h1>{user.name}</h1>
            <p className="user-email">{user.email}</p>
            <p className="join-date">С нами с {new Date(user.joinDate).toLocaleDateString('ru-RU', { 
              year: 'numeric', 
              month: 'long' 
            })}</p>
          </div>
        </div>
        <Button variant="secondary" className="edit-profile-btn">
          Редактировать профиль
        </Button>
      </motion.div>

      <div className="profile-content">
        <motion.div 
          className="main-stats"
          variants={cardVariants}
          initial="initial"
          animate="animate"
        >
          <Card className="stats-card">
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-value">{user.stats.totalRides}</span>
                <span className="stat-label">Поездок</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{user.stats.totalDistance} км</span>
                <span className="stat-label">Пройдено</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">
                  {user.stats.averageRating}
                  <span className="rating-star">★</span>
                </span>
                <span className="stat-label">Рейтинг</span>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="profile-tabs">
          <div className="tabs-header">
            <button 
              className={`tab-button ${activeTab === 'stats' ? 'active' : ''}`}
              onClick={() => setActiveTab('stats')}
            >
              Статистика
            </button>
            <button 
              className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              История поездок
            </button>
            <button 
              className={`tab-button ${activeTab === 'achievements' ? 'active' : ''}`}
              onClick={() => setActiveTab('achievements')}
            >
              Достижения
            </button>
          </div>

          <motion.div 
            className="tab-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'stats' && (
              <div className="stats-section">
                <Card className="favorite-zones">
                  <h3>Любимые места катания</h3>
                  <div className="zones-grid">
                    {user.stats.favoriteZones.map((zone, index) => (
                      <motion.div 
                        key={zone}
                        className="zone-item"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {zone}
                      </motion.div>
                    ))}
                  </div>
                </Card>
                <UserStats />
              </div>
            )}

            {activeTab === 'history' && (
              <div className="history-section">
                <CurrentRentals />
                <RentalHistory />
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="achievements-grid">
                {user.achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    variants={cardVariants}
                    custom={index}
                    initial="initial"
                    animate="animate"
                  >
                    <Card className="achievement-card">
                      <div className="achievement-icon">{achievement.icon}</div>
                      <h3>{achievement.title}</h3>
                      <p>{achievement.description}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 