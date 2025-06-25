import { useState } from 'react';
import logo from '../epicenter_logo_small.jpg';

export function Main({ children }) {
  return <div className="main">{children}</div>;
}

export function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

export function Box({ children }) {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? '–' : '+'}
      </button>
      {isOpen1 && children}
    </div>
  );
}

export function Logo() {
  return (
    <div className="logo">
      <img src={logo} alt="Epicenter logo" />
      <h1 className="hidden">Epicenter</h1>
    </div>
  );
}

export function SearchResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
