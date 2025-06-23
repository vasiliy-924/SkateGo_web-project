import React from 'react';
import { Button as MuiButton } from '@mui/material';
import PropTypes from 'prop-types';

const Button = ({ 
  children, 
  variant = 'contained', 
  size = 'medium',
  color = 'primary',
  fullWidth = false,
  startIcon,
  endIcon,
  disabled = false,
  onClick,
  ...props 
}) => {
  return (
    <MuiButton
      variant={variant}
      size={size}
      color={color}
      fullWidth={fullWidth}
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'error', 'warning', 'info']),
  fullWidth: PropTypes.bool,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button; 