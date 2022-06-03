import React, { useEffect } from 'react';
import './App.css';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/Products';
import CreateUser from './pages/CreateUser';
import axios from 'axios';

function App() {
  const history = useHistory();

  const purgeUser = () => {
    localStorage.removeItem('user');
    history.push('/');
  }

  const validateToken = async () => {
    const { REACT_APP_SERVER } = process.env;
    const currentUserJSON = localStorage.getItem('user');

    if (currentUserJSON) {
      let currentUser;

      try {
        currentUser = JSON.parse(currentUserJSON);
        const validation = await axios.get(`${REACT_APP_SERVER}/validateToken`, {
          headers: {
            'authorization': currentUser.token,
          },
        });
  
        if (validation.status === 401) purgeUser();
      } catch (e) {
        purgeUser();
      }
      
      
    }
  }

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <Switch>
      <Route exact path="/"><Redirect to="/login" /></Route>
      <Route exact path="/login"><Login /></Route>
      <Route exact path="/register"><CreateUser /></Route>
      <Route exact path="/customer/products" component={ Products } />
    </Switch>
  );
}

export default App;
