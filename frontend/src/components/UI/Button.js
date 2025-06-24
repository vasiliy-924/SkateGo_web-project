import React from 'react';
import { useTheme } from '../../theme/ThemeContext';
import './Button.css';
import PropTypes from 'prop-types';

const Button = ({ 
  children, 
  className = '', 
  variant = 'neumorphic', // 'neumorphic', 'glass', 'text'
  size = 'medium', // 'small', 'medium', 'large'
  disabled = false,
  onClick,
  type = 'button',
  ...props 
}) => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const getVariantClass = () => {
    switch (variant) {
      case 'glass':
        return isDark ? 'glass-dark' : 'glass-light';
      case 'text':
        return 'btn-text';
      case 'neumorphic':
      default:
        return isDark ? 'neumorphism-dark' : 'neumorphism-light';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'btn-small';
      case 'large':
        return 'btn-large';
      case 'medium':
      default:
        return 'btn-medium';
    }
  };

  return (
    <button
      type={type}
      className={`btn ${getVariantClass()} ${getSizeClass()} ${className} ${disabled ? 'disabled' : ''}`}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'error', 'warning', 'info']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
};

export default Button; 