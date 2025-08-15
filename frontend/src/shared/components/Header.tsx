import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">Skate.GO</Link>
        <nav className="nav">
          <Link to="/">Главная</Link>
          <Link to="/faq">FAQ</Link>
        </nav>
        <div className="spacer" />
        <div className="row">
          <a className="btn btn--accent" href="#install">Установить</a>
        </div>
      </div>
    </header>
  );
}


