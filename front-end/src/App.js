import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import Login from './pages/Login';
import Products from './pages/Products';
import CreateUser from './pages/CreateUser';
import axios from 'axios';
import { UserContext } from './provider/UserProvider';

function App() {
  const { user, updateUser } = useContext(UserContext);
  const history = useHistory();
  const unauthorized = 401;
  const [token, setToken] = useState('');

  const purgeUser = () => {
    updateUser();
    history.push('/');
  };

  const validateToken = async () => {
    const { REACT_APP_SERVER } = process.env;

    if (user) {
      const validation = await axios.get(`${REACT_APP_SERVER}/validateToken`, {
        headers: {
          'authorization': user.token,
        },
      });
      if (validation.status === 401) purgeUser();
    } else {
      purgeUser();
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
      <Route exact path="/customer/products"><Products /></Route>
    </Switch>
  );
}

export default App;
