import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useMemo, useState } from 'react';
import { getCityBySlug, getCityParkings, getCityZones } from '@api/cities';

type Props = { citySlug: string };

export function CityMap({ citySlug }: Props) {
  const [geojson, setGeojson] = useState<any | null>(null);
  const [parkings, setParkings] = useState<Array<{ id: string; name: string; coords: [number, number] }>>([]);
  const [center, setCenter] = useState<[number, number]>([55.751244, 37.618423]);
  const [zoom, setZoom] = useState(11);

  useEffect(() => {
    (async () => {
      const city = await getCityBySlug(citySlug);
      if (city?.center) {
        setCenter([city.center[1], city.center[0]]);
        setZoom(12);
      }
      const [zones, parkingsData] = await Promise.all([
        getCityZones(citySlug),
        getCityParkings(citySlug)
      ]);
      setGeojson(zones);
      setParkings(parkingsData);
    })();
  }, [citySlug]);

  const style = useMemo(
    () => ({
      fillColor: '#22c55e',
      color: '#16a34a',
      weight: 1,
      fillOpacity: 0.25
    }),
    []
  );

  return (
    <div style={{ height: 480 }}>
      <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
        {geojson && <GeoJSON data={geojson as any} style={() => style} />}
        {parkings.map((p) => (
          <Marker key={p.id} position={[p.coords[1], p.coords[0]]}>
            <Popup>{p.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}


