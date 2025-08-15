import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../pages/Home';
import { CityPage } from '../pages/City';
import { FAQPage } from '../pages/FAQ';
import { NotFoundPage } from '../pages/NotFound';
import { Header } from '../shared/components/Header';
import { Footer } from '../shared/components/Footer';
import '../styles/theme.css';

export default function App() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/city/:slug" element={<CityPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}


