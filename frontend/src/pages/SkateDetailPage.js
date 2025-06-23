import React from 'react';
import { useParams } from 'react-router-dom';

const SkateDetailPage = () => {
  const { id } = useParams();
  
  return (
    <div>
      <h1>Skateboard Details</h1>
      <p>Skateboard ID: {id}</p>
    </div>
  );
};

export default SkateDetailPage; 