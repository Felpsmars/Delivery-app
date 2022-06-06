import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Products from './pages/Products';
import CreateUser from './pages/CreateUser';
import Checkout from './pages/Checkout';
import axios from 'axios';

function App() {
  return (
    <Switch>
      <Route exact path="/"><Redirect to="/login" /></Route>
      <Route exact path="/login"><Login /></Route>
      <Route exact path="/register"><CreateUser /></Route>
      <Route exact path="/customer/products" component={ Products } />
      <Route exact path="/customer/checkout"><Checkout /></Route>
    </Switch>
    <Routes>
      <Route path="/" element={ <Navigate to="/login" /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <CreateUser /> } />
      <Route path="/customer/products" element={ <Products /> } />
    </Routes>
  );
}

export default App;
