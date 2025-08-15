import { useEffect, useState } from 'react';
import { getTariffs, type Tariff } from '@api/tariffs';

export function TariffCardList() {
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getTariffs();
        setTariffs(data);
      } catch (e) {
        setError('Не удалось загрузить тарифы');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div>Загрузка…</div>;
  if (error) return <div role="alert">{error}</div>;
  if (!Array.isArray(tariffs)) return <div role="alert">Неверный формат данных тарифов</div>;

  return (
    <div className="cards">
      {tariffs.map((t) => (
        <div key={t.id} className="card">
          <div className="card-title">{t.title}</div>
          <div>Старт: {t.start_price}₽</div>
          <div>Мин: {t.per_minute}₽/мин</div>
          {t.additional && <div className="card-sub">{t.additional}</div>}
        </div>
      ))}
    </div>
  );
}


