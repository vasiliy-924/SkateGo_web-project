import { useEffect, useState } from 'react';

type FAQ = { id: string; q: string; a: string };

export function FAQAccordion() {
  const [items, setItems] = useState<FAQ[]>([]);

  useEffect(() => {
    setItems([
      { id: '1', q: 'Как начать поездку?', a: 'Установите приложение, отсканируйте QR на скейте.' },
      { id: '2', q: 'Как оплатить?', a: 'Привяжите карту в приложении, списание поминутное.' },
      { id: '3', q: 'Где кататься?', a: 'Следуйте зонам на карте, вне зон — запрещено.' }
    ]);
  }, []);

  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="accordion">
      {items.map((i) => (
        <div key={i.id} className="accordion-item">
          <button
            onClick={() => setOpenId(openId === i.id ? null : i.id)}
            aria-expanded={openId === i.id}
            className="accordion-btn"
          >
            {i.q}
          </button>
          {openId === i.id && <div className="accordion-content">{i.a}</div>}
        </div>
      ))}
    </div>
  );
}


