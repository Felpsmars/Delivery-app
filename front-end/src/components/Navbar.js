import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../provider/UserProvider';

const Navbar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, logout } = useContext(UserContext);

  const leftSideButtons = () => {
    switch (user.role) {
    case 'administrator':
      return (
        <li>
          <Link to="/">
            Gerenciar Usuários
          </Link>
        </li>
      );
    case 'seller':
      return (
        <li>
          <Link
            to="/seller/orders"
            data-testid="customer_products__element-navbar-link-orders"
          >
            Pedidos
          </Link>
        </li>
      );
    default:
      return (
        <>
          <li>
            <Link
              data-testid="customer_products__element-navbar-link-products"
              to="/customer/products"
            >
              Produtos
            </Link>
          </li>
          <li>
            <Link
              data-testid="customer_products__element-navbar-link-orders"
              to="/customer/orders"
            >
              Meus Pedidos
            </Link>
          </li>
        </>
      );
    }
  };

  useEffect(() => {
    if (user) setIsLoading(false);
  }, [user]);

  return (
    isLoading ? (
      <p>Carregando Navbar...</p>
    ) : (
      <ul className="navbar">
        { leftSideButtons() }
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
