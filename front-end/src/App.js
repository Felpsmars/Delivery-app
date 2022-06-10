import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Products from './pages/Products';
import CreateUser from './pages/CreateUser';
import Checkout from './pages/Checkout';
import ClientProvider from './provider/ClientProvider';
import SellerOrder from './pages/SellerOrder';
import Orders from './pages/Orders';
import Order from './pages/Order';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <CreateUser /> } />
      <Route path="/customer" element={ <ClientProvider /> }>
        <Route path="products" element={ <Products /> } />
        <Route path="checkout" element={ <Checkout /> } />
        <Route path="orders" element={ <Orders /> } />
        <Route path="orders/:id" element={ <Order /> } />
      </Route>
      <Route path="/seller/orders" element={ <SellerOrder /> } />
    </Routes>
  );
}

export default App;
