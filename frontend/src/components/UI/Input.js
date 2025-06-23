import React from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

const Input = ({
  type = 'text',
  label,
  value,
  onChange,
  error,
  helperText,
  fullWidth = true,
  size = 'medium',
  variant = 'outlined',
  disabled = false,
  required = false,
  multiline = false,
  rows,
  startAdornment,
  endAdornment,
  ...props
}) => {
  return (
    <TextField
      type={type}
      label={label}
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={error || helperText}
      fullWidth={fullWidth}
      size={size}
      variant={variant}
      disabled={disabled}
      required={required}
      multiline={multiline}
      rows={rows}
      InputProps={{
        startAdornment,
        endAdornment,
      }}
      {...props}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  error: PropTypes.string,
  helperText: PropTypes.string,
  fullWidth: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium']),
  variant: PropTypes.oneOf(['outlined', 'filled', 'standard']),
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  startAdornment: PropTypes.node,
  endAdornment: PropTypes.node,
};

export default Input; 