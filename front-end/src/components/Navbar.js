import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../provider/UserProvider';

const Navbar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, logout } = useContext(UserContext);

  useEffect(() => {
    if (user) setIsLoading(false);
  }, [user]);

  return (
    isLoading ? (
      <p>Carregando Navbar...</p>
    ) : (
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
            {user.name}
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
    )
  );
};

export default Navbar;