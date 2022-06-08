import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../provider/UserProvider';

const Navbar = ({ pageName }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, logout } = useContext(UserContext);

  const urlStringPageName = (url) => {
    switch (url) {
    case 'Produtos':
      return 'products';

    default:
      return '';
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
        <li>
          <a
            data-testid={
              `customer_products__element-navbar-link-${urlStringPageName(pageName)}`
            }
            href={ `/customer/${urlStringPageName(pageName)}` }
          >
            {pageName}
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

Navbar.defaultProps = {
  pageName: 'Produtos',
};

Navbar.propTypes = {
  pageName: PropTypes.string,
};

export default Navbar;
