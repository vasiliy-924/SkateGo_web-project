import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReviewForm from './ReviewForm';

describe('ReviewForm', () => {
  const mockSubmit = jest.fn();
  
  beforeEach(() => {
    mockSubmit.mockClear();
  });

  test('renders all form elements correctly', () => {
    render(<ReviewForm onSubmit={mockSubmit} />);
    
    expect(screen.getByLabelText(/рейтинг/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/комментарий/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /отправить/i })).toBeInTheDocument();
  });

  test('validates required fields before submission', async () => {
    render(<ReviewForm onSubmit={mockSubmit} />);
    
    const submitButton = screen.getByRole('button', { name: /отправить/i });
    fireEvent.click(submitButton);
    
    expect(mockSubmit).not.toHaveBeenCalled();
    expect(await screen.findByText(/рейтинг обязателен/i)).toBeInTheDocument();
  });

  test('submits form with valid data', async () => {
    render(<ReviewForm onSubmit={mockSubmit} />);
    
    // Заполняем рейтинг
    const ratingInput = screen.getByLabelText(/рейтинг/i);
    await userEvent.type(ratingInput, '5');
    
    // Заполняем комментарий
    const commentInput = screen.getByLabelText(/комментарий/i);
    await userEvent.type(commentInput, 'Отличный сервис!');
    
    // Отправляем форму
    const submitButton = screen.getByRole('button', { name: /отправить/i });
    fireEvent.click(submitButton);
    
    expect(mockSubmit).toHaveBeenCalledWith({
      rating: 5,
      comment: 'Отличный сервис!'
    });
  });

  test('displays error message for invalid rating', async () => {
    render(<ReviewForm onSubmit={mockSubmit} />);
    
    const ratingInput = screen.getByLabelText(/рейтинг/i);
    await userEvent.type(ratingInput, '6');
    
    expect(await screen.findByText(/рейтинг должен быть от 1 до 5/i)).toBeInTheDocument();
  });
}); 