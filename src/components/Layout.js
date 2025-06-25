import { useState } from 'react';
import logo from '../epicenter_logo_small.jpg';

export function Main({ children }) {
  return <div className="main">{children}</div>;
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
