import { useParams } from 'react-router-dom';
import { Suspense } from 'react';
import { CityMap } from '../shared/components/CityMap';

export function CityPage() {
  const { slug } = useParams();
  return (
    <div style={{ padding: 16 }}>
      <h1>Город: {slug}</h1>
      <Suspense fallback={<div>Загрузка карты…</div>}>
        <CityMap citySlug={slug ?? ''} />
      </Suspense>
    </div>
  );
}


