import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div style={{ padding: 16 }}>
      <h1>Страница не найдена</h1>
      <Link to="/">На главную</Link>
    </div>
  );
}


