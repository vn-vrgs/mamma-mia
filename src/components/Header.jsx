import React from 'react';

const Header = () => {
  return (
    <header className="header-bg d-flex flex-column justify-content-center align-items-center text-center py-5 px-3">
      <div className="header-overlay-content p-4 rounded-4 backdrop-blur">
        <h1 className="header-title display-4 fw-bold text-warning mb-2">
          ¡Pizzería Mamma Mia!
        </h1>
        <p className="header-subtitle lead text-light opacity-90 mb-3">
          ¡Tenemos las mejores pizzas tradicionales que podrás encontrar!
        </p>
        <div className="mx-auto border-top border-warning w-25 opacity-75"></div>
      </div>
    </header>
  );
};

export default Header;
