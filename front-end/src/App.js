import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/Products';
import CreateUser from './components/CreateUser';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/products" component={ Products } />
      <Route exact path="/create" component={ CreateUser } />

    </Switch>

  );
}

export default App;
