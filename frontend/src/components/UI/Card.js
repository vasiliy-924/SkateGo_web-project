import React from 'react';
import { useTheme } from '../../theme/ThemeContext';
import './Card.css';
import PropTypes from 'prop-types';

const Card = ({ 
  children, 
  className = '', 
  variant = 'neumorphic', // 'neumorphic', 'inset', 'glass'
  onClick,
  ...props 
}) => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const getVariantClass = () => {
    switch (variant) {
      case 'inset':
        return isDark ? 'neumorphism-inset-dark' : 'neumorphism-inset-light';
      case 'glass':
        return isDark ? 'glass-dark' : 'glass-light';
      case 'neumorphic':
      default:
        return isDark ? 'neumorphism-dark' : 'neumorphism-light';
    }
  };

  return (
    <div 
      className={`card ${getVariantClass()} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Card; 