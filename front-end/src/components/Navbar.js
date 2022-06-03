import React from 'react';

const Navbar = () => (
  <ul className="navbar">
    <li>
      <a
        data-testid="customer_products__element-navbar-link-products"
        href="/customer/products"
      >
        Produtos
      </a>
    </li>
    <li>
      <a
        data-testid="customer_products__element-navbar-link-orders"
        href="/customer/products"
      >
        Meus Pedidos
      </a>
    </li>
    <li>
      <a
        data-testid="customer_products__element-navbar-user-full-name"
        href="/customer/products"
      >
        Nome
      </a>
    </li>
    <li>
      <a
        data-testid="customer_products__element-navbar-link-logout"
        href="/customer/products"
      >
        Sair
      </a>
    </li>
  </ul>
);

export default Navbar;
