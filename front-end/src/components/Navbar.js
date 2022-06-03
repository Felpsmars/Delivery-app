import React from 'react';

const Navbar = () => (
  <ul className="navbar">
    <li>
      <a data-testid="customer_products__element-navbar-link-products">
        Produtos
      </a>
    </li>
    <li>
      <a data-testid="customer_products__element-navbar-link-orders">
        Meus Pedidos
      </a>
    </li>
    <li>
      <a data-testid="customer_products__element-navbar-user-full-name">
        Nome
      </a>
    </li>
    <li>
      <a data-test-id="customer_products__element-navbar-link-logout">
        Sair
      </a>
    </li>
  </ul>
);

export default Navbar;
