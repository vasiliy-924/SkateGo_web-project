import { Link } from 'react-router-dom';
import { Hero } from '../shared/components/Hero';
import { CityList } from '../shared/components/CityList';
import { TariffCardList } from '../shared/components/TariffCardList';
import { FAQAccordion } from '../shared/components/FAQAccordion';

export function HomePage() {
  return (
    <div>
      <Hero />
      <div className="container">
        <section className="section">
          <h2>Доступные города</h2>
          <div className="panel">
            <CityList />
            <div style={{ marginTop: 12 }}>
              <Link to="/faq" className="btn">Частые вопросы</Link>
            </div>
          </div>
        </section>
        <section className="section">
          <h2>Тарифы</h2>
          <div className="cards">
            <TariffCardList />
          </div>
        </section>
        <section className="section">
          <h2>FAQ</h2>
          <div className="panel">
            <FAQAccordion />
          </div>
        </section>
      </div>
    </div>
  );
}


