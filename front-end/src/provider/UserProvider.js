import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const history = useHistory();

  const UNAUTHORIZED = 401;

  const fetchUser = () => {
    const currentUser = localStorage.getItem('user');

    if (currentUser) {
      const parsedUser = JSON.parse(user);
      setUser(parsedUser);
    }
  };

  const updateUser = (newUser) => {
    if (!newUser) {
      localStorage.removeItem('user');
    } else {
      localStorage.setItem('user', JSON.stringify(newUser));
    }
  };

  const purgeUser = () => {
    updateUser();
    history.push('/');
  };

  const validateToken = async () => {
    const { REACT_APP_SERVER } = process.env;

    if (user) {
      const validation = await axios.get(`${REACT_APP_SERVER}/validateToken`, {
        headers: {
          authorization: user.token,
        },
      });
      if (validation.status === UNAUTHORIZED) purgeUser();
    } else {
      purgeUser();
    }
  };

  useEffect(() => {
    fetchUser();
    validateToken();
  }, []);

  const value = {
    user,
    updateUser,
  };

  return (
    <UserContext.Provider value={ value }>
      { children }
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default UserProvider;
