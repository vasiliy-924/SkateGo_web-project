import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const getStatusIcon = (status) => {
  const colors = { 
    'Доступен': 'green', 
    'Арендован': 'blue',
    'На обслуживании': 'orange',
    'Сломан': 'red'
  };
  
  return L.divIcon({
    className: `map-marker ${colors[status]}`,
    html: `<div class="marker-pin" style="background-color: ${colors[status]}"></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  });
};

const SkateMap = ({ skateboards, onSkateSelect }) => {
  return (
    <MapContainer 
      center={[55.75, 37.61]} 
      zoom={12} 
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        url={process.env.REACT_APP_MAP_TILE_LAYER || 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {skateboards.map(skate => (
        <Marker
          key={skate.id}
          position={[skate.location.lat, skate.location.lng]}
          icon={getStatusIcon(skate.status)}
          eventHandlers={{
            click: () => onSkateSelect(skate)
          }}
        >
          <Popup>
            <div>
              <h3>Скейтборд #{skate.id}</h3>
              <p>Модель: {skate.model}</p>
              <p>Статус: {skate.status}</p>
              <p>Заряд: {skate.battery_level}%</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default SkateMap; 