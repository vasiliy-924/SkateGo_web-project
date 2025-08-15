import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCities, type City } from '@api/cities';

export function CityList() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getCities();
        setCities(data);
      } catch (e) {
        setError('Не удалось загрузить города');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div>Загрузка…</div>;
  if (error) return <div role="alert">{error}</div>;
  if (!Array.isArray(cities)) return <div role="alert">Неверный формат данных городов</div>;

  return (
    <ul className="list">
      {cities.map((c) => (
        <li key={c.slug}>
          <Link to={`/city/${c.slug}`}>{c.name}</Link>
        </li>
      ))}
    </ul>
  );
}


