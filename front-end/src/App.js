import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Products from './pages/Products';
import CreateUser from './pages/CreateUser';
import Checkout from './pages/Checkout';
import ClientProvider from './provider/ClientProvider';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <CreateUser /> } />
      <Route path="/customer" element={ <ClientProvider /> } >
        <Route path="products" element={ <Products /> } />
        <Route path="checkout" element={ <Checkout /> } />
      </Route>
    </Routes>
  );
}

export default App;
