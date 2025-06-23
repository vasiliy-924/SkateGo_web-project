import React from 'react';
import { motion } from 'framer-motion';
import { skeletonVariants } from '../../theme/animations';
import './Skeleton.css';

const Skeleton = ({ 
  width, 
  height, 
  borderRadius = '4px',
  className = '',
  ...props 
}) => {
  const style = {
    width,
    height,
    borderRadius,
    ...props.style
  };

  return (
    <motion.div
      className={`ui-skeleton ${className}`}
      variants={skeletonVariants}
      initial="initial"
      animate="animate"
      style={style}
      {...props}
    />
  );
};

export default Skeleton; 