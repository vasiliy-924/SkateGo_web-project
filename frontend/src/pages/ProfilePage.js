import React, { useEffect } from 'react';
import CurrentRentals from '../components/CurrentRentals';
import RentalHistory from '../components/RentalHistory';
import UserStats from '../components/UserStats';
import { requestNotificationPermission, registerServiceWorker } from '../services/notifications';
import '../styles/profile.css';

const ProfilePage = () => {
  useEffect(() => {
    // Запрашиваем разрешение на уведомления при первом посещении профиля
    const setupNotifications = async () => {
      const permissionGranted = await requestNotificationPermission();
      if (permissionGranted) {
        await registerServiceWorker();
      }
    };
    
    setupNotifications();
  }, []);

  return (
    <div className="profile-page">
      <h1>Личный кабинет</h1>
      
      <section className="profile-section">
        <CurrentRentals />
      </section>

      <section className="profile-section">
        <UserStats />
      </section>

      <section className="profile-section">
        <RentalHistory />
      </section>
    </div>
  );
};

export default ProfilePage; 