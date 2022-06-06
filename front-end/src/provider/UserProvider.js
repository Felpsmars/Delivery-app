import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  const validateUser = async () => {
    const { REACT_APP_SERVER } = process.env;
    const UNAUTHORIZED = 401;
    const currentUser = localStorage.getItem('user');

    if (currentUser) {
      const parsedUser = JSON.parse(currentUser);
      const validation = await axios.get(`${REACT_APP_SERVER}/validateToken`, {
        headers: {
          authorization: parsedUser.token,
        },
      });
      if (validation.status === UNAUTHORIZED) return false;
      return true;
    }
    return false;
  };

  const fetchUser = () => {
    const currentUser = localStorage.getItem('user');
    if (currentUser) {
      const parsedUser = JSON.parse(currentUser);
      setUser(parsedUser);
    }
  };

  const updateUser = (newUser) => {
    if (!newUser) {
      localStorage.removeItem('user');
    } else {
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
    }
  };

  const logout = () => {
    setUser(undefined);
    updateUser();
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const value = {
    user,
    updateUser,
    validateUser,
    logout,
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
