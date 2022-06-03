import React, { useEffect, useState } from 'react';
import './App.css';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import Login from './pages/Login';
import Products from './pages/Products';
import CreateUser from './pages/CreateUser';

function App() {
  const history = useHistory();
  const unauthorized = 401;
  const [token, setToken] = useState('');

  const purgeUser = () => {
    localStorage.removeItem('user');
    history.push('/');
  };

  const validateToken = async () => {
    const { REACT_APP_SERVER } = process.env;
    const currentUserJSON = localStorage.getItem('user');

    if (currentUserJSON) {
      let currentUser;

      try {
        currentUser = JSON.parse(currentUserJSON);
        setToken(currentUser.token);
        const validation = await axios.get(`${REACT_APP_SERVER}/validateToken`, {
          headers: {
            authorization: currentUser.token,
          },
        });

        if (validation.status === unauthorized) purgeUser();
      } catch (e) {
        purgeUser();
      }
    }
  };

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  return (
    <Switch>
      <Route exact path="/"><Redirect to="/login" /></Route>
      <Route exact path="/login"><Login /></Route>
      <Route exact path="/register"><CreateUser /></Route>
      <Route exact path="/customer/products"><Products token={ token } /></Route>
    </Switch>
  );
}

export default App;
