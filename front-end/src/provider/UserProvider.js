import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  const fetchUser = () => {
    const user = localStorage.getItem('user');

    if (user) {
      const parsedUser = JSON.parse(user);
      setUser(parsedUser);
    }
  }

  const updateUser = (newUser) => {
    if (!newUser) {
      localStorage.removeItem('user');
    } else {
      localStorage.setItem('user', JSON.stringify(newUser));
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const value = {
    user,
    updateUser,
  }

  return (
    <UserContext.Provider value={ value }>
      { children }
    </UserContext.Provider>
  )
};

export default UserProvider;