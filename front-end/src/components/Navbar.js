import React from 'react';

const Navbar = () => (
  <ul className="navbar">
    <li data-testid="customer_products__element-navbar-link-products">

      Produtos

    </li>
    <li data-testid="customer_products__element-navbar-link-orders">

      Meus Pedidos

    </li>
    <li data-testid="customer_products__element-navbar-user-full-name">

      Nome

    </li>
    <li data-test-id="customer_products__element-navbar-link-logout">

      Sair

    </li>
  </ul>
);

export default Navbar;
