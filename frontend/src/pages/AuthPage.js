import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement authentication logic
    console.log('Form submitted:', { email, password });
  };

  return (
    <div className="auth-page">
      {/* Декоративные элементы */}
      <div className="auth-decoration auth-decoration-1"></div>
      <div className="auth-decoration auth-decoration-2"></div>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">{isLogin ? 'Вход' : 'Регистрация'}</h1>
            <p className="auth-subtitle">
              {isLogin 
                ? 'Добро пожаловать! Войдите в свой аккаунт'
                : 'Создайте аккаунт для доступа к сервису'}
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <span className="input-icon">📧</span>
              <input
                type="email"
                className="form-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                className="form-input"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-button">
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </button>
          </form>

          <div className="auth-divider">
            <span>или</span>
          </div>

          <div className="social-buttons">
            <button className="social-button">
              <span>🌐</span>
            </button>
            <button className="social-button">
              <span>📱</span>
            </button>
          </div>

          <div className="auth-footer">
            {isLogin ? (
              <>
                Нет аккаунта?{' '}
                <a href="#" className="auth-link" onClick={() => setIsLogin(false)}>
                  Зарегистрироваться
                </a>
              </>
            ) : (
              <>
                Уже есть аккаунт?{' '}
                <a href="#" className="auth-link" onClick={() => setIsLogin(true)}>
                  Войти
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage; 