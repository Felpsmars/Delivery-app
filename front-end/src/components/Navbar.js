import React, { useContext } from 'react';
import { UserContext } from '../provider/UserProvider';

const Navbar = () => {
  const { user, logout } = useContext(UserContext);

  return (
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
        <span
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { user.name }
        </span>
      </li>
      <li>
        <a
          data-testid="customer_products__element-navbar-link-logout"
          href="/"
          onClick={ () => logout() }
        >
          Sair
        </a>
      </li>
    </ul>
  );
};

export default Navbar;
