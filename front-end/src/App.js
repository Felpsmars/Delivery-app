import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Products from './pages/Products';
import CreateUser from './pages/CreateUser';
import CartProvider from './provider/CartProvider';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <CreateUser /> } />
      <Route path="/customer" element={ <CartProvider /> }>
        <Route path="products" element={ <Products /> } />
      </Route>
    </Routes>
  );
}

export default App;
