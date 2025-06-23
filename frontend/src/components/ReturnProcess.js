import React, { useState } from 'react';
import api from '../services/api';

const ReturnProcess = ({ onComplete }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [qrCode, setQrCode] = useState('');

  const checkLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // TODO: Добавить реальную проверку зоны возврата
          const isInZone = true; // Заглушка
          resolve(isInZone);
        },
        (error) => {
          reject(new Error('Не удалось получить геолокацию'));
        }
      );
    });
  };

  const handleReturn = async () => {
    try {
      setLoading(true);
      setError(null);

      // Получаем данные скейта по QR-коду
      const skateResponse = await api.get(`/skateboards/${qrCode}`);
      const skateData = skateResponse.data;

      // Проверяем геолокацию
      const isInReturnZone = await checkLocation();

      if (!isInReturnZone) {
        throw new Error('Вы находитесь вне зоны возврата. Штраф: 1000₽');
      }

      // Отправляем запрос на возврат
      const returnResponse = await api.post('/returns/', {
        skateboard_id: skateData.id,
        qr_code: qrCode
      });

      // Проверяем на штрафы
      if (returnResponse.data.penalties) {
        setError(`Возврат выполнен. Штрафы: ${returnResponse.data.penalties}₽`);
      } else {
        onComplete(returnResponse.data);
      }
    } catch (err) {
      setError(err.message || 'Произошла ошибка при возврате');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="return-process">
      <h3>Возврат скейтборда</h3>
      
      <div className="qr-input">
        <input
          type="text"
          placeholder="Введите код с QR-кода"
          value={qrCode}
          onChange={(e) => setQrCode(e.target.value)}
          disabled={loading}
        />
      </div>

      <button 
        onClick={handleReturn}
        disabled={loading || !qrCode}
        className="return-button"
      >
        {loading ? 'Обработка...' : 'Вернуть скейтборд'}
      </button>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  );
};

export default ReturnProcess; 