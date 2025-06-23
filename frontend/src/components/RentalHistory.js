import React, { useState, useEffect } from 'react';
import api from '../services/api';

const RentalHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, [page]);

  const fetchHistory = async () => {
    try {
      const response = await api.get(`/rentals/history/?page=${page}`);
      const newHistory = response.data.results;
      
      setHistory(prev => page === 1 ? newHistory : [...prev, ...newHistory]);
      setHasMore(response.data.next !== null);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching rental history:', error);
      setLoading(false);
    }
  };

  const calculateDuration = (start, end) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const diff = (endTime - startTime) / 1000 / 60; // в минутах
    
    if (diff < 60) {
      return `${Math.round(diff)} мин`;
    }
    return `${Math.round(diff / 60 * 10) / 10} ч`;
  };

  return (
    <div className="rental-history">
      <h2>История аренд</h2>
      
      {loading && page === 1 ? (
        <p>Загрузка...</p>
      ) : (
        <>
          <div className="history-list">
            {history.map(rental => (
              <div key={rental.id} className="history-item">
                <div className="history-header">
                  <h3>Скейтборд #{rental.skateboard_id}</h3>
                  <span className={`status ${rental.status.toLowerCase()}`}>
                    {rental.status}
                  </span>
                </div>

                <div className="history-details">
                  <div className="detail-row">
                    <span>Начало:</span>
                    <span>{new Date(rental.start_time).toLocaleString()}</span>
                  </div>
                  <div className="detail-row">
                    <span>Окончание:</span>
                    <span>{new Date(rental.end_time).toLocaleString()}</span>
                  </div>
                  <div className="detail-row">
                    <span>Длительность:</span>
                    <span>{calculateDuration(rental.start_time, rental.end_time)}</span>
                  </div>
                  <div className="detail-row">
                    <span>Стоимость:</span>
                    <span className="price">{rental.total_price}₽</span>
                  </div>
                  
                  {rental.penalty_amount > 0 && (
                    <div className="penalty-info">
                      <span>Штраф:</span>
                      <span className="penalty">{rental.penalty_amount}₽</span>
                      <p className="penalty-reason">{rental.penalty_reason}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <button
              className="load-more-button"
              onClick={() => setPage(prev => prev + 1)}
              disabled={loading}
            >
              {loading ? 'Загрузка...' : 'Загрузить еще'}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default RentalHistory; 