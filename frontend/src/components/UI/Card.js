import React from 'react';
import { motion } from 'framer-motion';
import { cardVariants } from '../../theme/animations';
import './Card.css';
import PropTypes from 'prop-types';

const Card = ({ 
  children, 
  variant = 'default',
  className = '',
  animate = true,
  title,
  subheader,
  action,
  footer,
  elevation = 1,
  ...props 
}) => {
  const classes = [
    'ui-card',
    `ui-card--${variant}`,
    className
  ].filter(Boolean).join(' ');

  const CardComponent = animate ? motion.div : 'div';
  const animationProps = animate ? {
    variants: cardVariants,
    initial: "initial",
    animate: "animate",
    whileHover: "hover",
    whileTap: "tap"
  } : {};

  return (
    <CardComponent 
      className={classes}
      {...animationProps}
      {...props}
    >
      {(title || subheader || action) && (
        <div className="ui-card__header">
          {title && <h2 className="ui-card__title">{title}</h2>}
          {subheader && <p className="ui-card__subheader">{subheader}</p>}
          {action && <div className="ui-card__action">{action}</div>}
        </div>
      )}
      <div className="ui-card__content">
        {children}
      </div>
      {footer && (
        <div className="ui-card__footer">
          {footer}
        </div>
      )}
    </CardComponent>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node,
  subheader: PropTypes.node,
  action: PropTypes.node,
  footer: PropTypes.node,
  elevation: PropTypes.number,
  variant: PropTypes.string,
  className: PropTypes.string,
  animate: PropTypes.bool,
};

export default Card; 