import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './SkateMap.css';

const SkateMap = ({ skateboards = [], onSkateSelect }) => {
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });
  }, []);

  const getStatusIcon = (status) => {
    const colors = { 
      'Доступен': 'green', 
      'Арендован': 'blue',
      'На обслуживании': 'orange',
      'Сломан': 'red'
    };
    
    return L.divIcon({
      className: `map-marker`,
      html: `<div class="marker-pin ${colors[status] || 'green'}"></div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    });
  };

  // Находим центр карты на основе координат скейтбордов
  const getMapCenter = () => {
    if (skateboards.length === 0) {
      return [55.75, 37.61]; // Москва по умолчанию
    }

    const lats = skateboards.map(s => s.location.lat);
    const lngs = skateboards.map(s => s.location.lng);
    return [
      (Math.max(...lats) + Math.min(...lats)) / 2,
      (Math.max(...lngs) + Math.min(...lngs)) / 2
    ];
  };

  return (
    <MapContainer 
      center={getMapCenter()} 
      zoom={13} 
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
            <div className="skateboard-popup">
              <h3>{skate.name}</h3>
              <p>Статус: <span className={`status status--${skate.status.toLowerCase()}`}>{skate.status}</span></p>
              <p>Заряд батареи: {skate.battery_level}%</p>
              <button 
                className="popup-button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSkateSelect(skate);
                }}
              >
                Подробнее
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default SkateMap; 