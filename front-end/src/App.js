import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/Products';

function App() {
  return (
    <Switch>
      <Route exact path="/"><Login /></Route>
      <Route exact path="/products" component={ Products } />
    </Switch>
  );
}

export default App;
