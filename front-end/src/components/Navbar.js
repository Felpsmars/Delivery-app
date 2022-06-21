import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../provider/UserProvider';
import style from './style/Navbar.module.css';

const Navbar = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const { user, logout } = useContext(UserContext);

  const leftSideButtons = () => {
    switch (user.role) {
    case 'administrator':
      return (
        <Link to="/" className={ style.navbarSelected }>
          GERENCIAR USUÁRIOS
        </Link>
      );
    case 'seller':
      return (
        <Link
          to="/seller/orders"
          data-testid="customer_products__element-navbar-link-orders"
          className={
            `${style.navbarOrders}
            ${location.pathname === '/seller/orders' && style.navbarSelected}`
          }
        >
          PEDIDOS
        </Link>
      );
    default:
      return (
        <>
          <Link
            to="/customer/products"
            data-testid="customer_products__element-navbar-link-products"
            className={
              `${style.navbarProducts}
              ${location.pathname === '/customer/products' && style.navbarSelected}`
            }
          >
            PRODUTOS
          </Link>
          <Link
            data-testid="customer_products__element-navbar-link-orders"
            to="/customer/orders"
            className={
              `${style.navbarOrders}
              ${location.pathname === '/customer/orders' && style.navbarSelected}`
            }
          >
            MEUS PEDIDOS
          </Link>
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
      <nav className={ style.navbar }>
        <div className={ style.navbarLeft }>
          {leftSideButtons()}
        </div>
        <div className={ style.navbarRight }>

          <span
            data-testid="customer_products__element-navbar-user-full-name"
            className={ style.navbarUsername }
          >
            {user.name}
          </span>
          <a
            data-testid="customer_products__element-navbar-link-logout"
            className={ style.navbarLogout }
            href="/"
            onClick={ logout }
          >
            Sair
          </a>
        </div>
      </nav>
    )
  );
};

export default Navbar;
