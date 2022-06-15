import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Products from './pages/Products';
import CreateUser from './pages/CreateUser';
import Checkout from './pages/Checkout';
import InfoProvider from './provider/InfoProvider';
import UserProvider from './provider/UserProvider';
import Orders from './pages/Orders';
import Order from './pages/Order';

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={ <Navigate to="/login" /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <CreateUser /> } />
        <Route path="/customer" element={ <InfoProvider /> }>
          <Route path="products" element={ <Products /> } />
          <Route path="checkout" element={ <Checkout /> } />
          <Route path="orders" element={ <Orders /> } />
          <Route path="orders/:id" element={ <Order /> } />
        </Route>
        <Route path="/seller" element={ <InfoProvider /> }>
          <Route path="orders" element={ <Orders /> } />
          <Route path="orders/:id" element={ <Order /> } />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
