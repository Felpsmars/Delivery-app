import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [sellers, setSellers] = useState([]);
  const [isUserValid, setIsUserValid] = useState(undefined);

  const fetchUser = async () => {
    const currentUser = localStorage.getItem('user');

    if (currentUser) {
      const parsedUser = JSON.parse(currentUser);
      setUser(parsedUser);
    }
  };

  const fetchSellers = async () => {
    const { REACT_APP_SERVER } = process.env;

    try {
      const response = await axios.get(`${REACT_APP_SERVER}/user/seller`, {
        headers: {
          authorization: user.token,
        },
      });
      setSellers(response.data);
    } catch (e) {
      console.log('Error while fetching sellers ', e.message);
    }
  };

  const validateUser = async () => {
    const { REACT_APP_SERVER } = process.env;

    const localStorageUser = localStorage.getItem('user');

    setIsUserValid(undefined);
    try {
      if (user.token) {
        await axios.get(`${REACT_APP_SERVER}/validateToken`, {
          headers: {
            authorization: user.token,
          },
        });
        setIsUserValid(true);
      } else if (!localStorageUser) {
        setIsUserValid(false);
      }
    } catch (e) {
      setIsUserValid(false);
    }
  };

  const updateUser = (newUser) => {
    setIsUserValid(undefined);
    if (!newUser) {
      localStorage.removeItem('user');
      setUser({});
    } else {
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
    }
  };

  const logout = () => {
    updateUser();
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    validateUser();
    if (user.token) fetchSellers();
  }, [user]);

  const value = {
    user,
    sellers,
    updateUser,
    logout,
    isUserValid,
  };

  return (
    <UserContext.Provider value={ value }>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default UserProvider;
