import React, { useState } from 'react';
import api from '../services/api';

const ReviewForm = ({ skateboardId, onSubmit }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateComment = (text) => {
    if (text.length < 10) {
      return 'Комментарий должен содержать минимум 10 символов';
    }
    if (text.length > 500) {
      return 'Комментарий не должен превышать 500 символов';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateComment(comment);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await api.post(`/skateboards/${skateboardId}/reviews/`, {
        rating,
        comment
      });

      setComment('');
      setRating(5);
      onSubmit(response.data);
    } catch (err) {
      setError(err.message || 'Произошла ошибка при отправке отзыва');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 10; i += 0.5) {
      stars.push(
        <button
          key={i}
          type="button"
          className={`star-button ${rating >= i ? 'active' : ''}`}
          onClick={() => setRating(i)}
        >
          {i % 1 === 0 ? '★' : '½'}
        </button>
      );
    }
    return stars;
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <h3>Оставить отзыв</h3>

      <div className="rating-container">
        <label>Оценка:</label>
        <div className="stars-container">
          {renderStars()}
        </div>
        <span className="rating-value">{rating} из 5</span>
      </div>

      <div className="comment-container">
        <label>Комментарий:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Поделитесь своими впечатлениями (минимум 10 символов)"
          rows={4}
          disabled={loading}
        />
        <span className="character-count">
          {comment.length}/500 символов
        </span>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <button 
        type="submit"
        disabled={loading || comment.length < 10 || comment.length > 500}
        className="submit-button"
      >
        {loading ? 'Отправка...' : 'Отправить отзыв'}
      </button>
    </form>
  );
};

export default ReviewForm; 