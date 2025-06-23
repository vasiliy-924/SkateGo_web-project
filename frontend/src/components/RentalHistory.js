import React, { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';

const RentalHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiService.getRentalHistory(page);
      if (page === 1) {
        setHistory(response.results);
      } else {
        setHistory(prev => [...prev, ...response.results]);
      }
      setHasMore(response.next !== null);
    } catch (error) {
      console.error('Error fetching rental history:', error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const calculateDuration = (start, end) => {
    if (!end) return 'В процессе';
    
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
                    {rental.status === 'active' ? 'Активная' : 'Завершена'}
                  </span>
                </div>

                <div className="history-details">
                  <div className="detail-row">
                    <span>Начало:</span>
                    <span>{new Date(rental.start_time).toLocaleString()}</span>
                  </div>
                  {rental.end_time && (
                    <div className="detail-row">
                      <span>Окончание:</span>
                      <span>{new Date(rental.end_time).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="detail-row">
                    <span>Длительность:</span>
                    <span>{calculateDuration(rental.start_time, rental.end_time)}</span>
                  </div>
                  {rental.total_cost !== null && (
                    <div className="detail-row">
                      <span>Стоимость:</span>
                      <span className="price">{rental.total_cost}₽</span>
                    </div>
                  )}
                  
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