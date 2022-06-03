import React, { useContext, useEffect } from 'react';
import './App.css';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/Products';
import CreateUser from './pages/CreateUser';
import axios from 'axios';
import { UserContext } from './provider/UserProvider';

function App() {
  const { user, updateUser } = useContext(UserContext);
  const history = useHistory();

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
  }, []);

  return (
    <Switch>
      <Route exact path="/"><Redirect to="/login" /></Route>
      <Route exact path="/login"><Login /></Route>
      <Route exact path="/register"><CreateUser /></Route>
      <Route exact path="/customer/products" component={Products} />
    </Switch>
  );
}

export default App;
