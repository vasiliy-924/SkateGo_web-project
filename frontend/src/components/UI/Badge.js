import React from 'react';
import { Chip } from '@mui/material';
import PropTypes from 'prop-types';

const Badge = ({
  label,
  color = 'default',
  variant = 'filled',
  size = 'medium',
  icon,
  onDelete,
  clickable = false,
  ...props
}) => {
  return (
    <Chip
      label={label}
      color={color}
      variant={variant}
      size={size}
      icon={icon}
      onDelete={onDelete}
      clickable={clickable}
      {...props}
    />
  );
};

Badge.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'success',
    'error',
    'info',
    'warning'
  ]),
  variant: PropTypes.oneOf(['filled', 'outlined']),
  size: PropTypes.oneOf(['small', 'medium']),
  icon: PropTypes.node,
  onDelete: PropTypes.func,
  clickable: PropTypes.bool,
};

export default Badge; 