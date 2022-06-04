import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/Products';
import CreateUser from './pages/CreateUser';

function App() {
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
