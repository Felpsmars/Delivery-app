import React, { useState } from 'react';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [wrongLogin, setWrongLogin] = useState(false);
  const minPassLength = 6;
  const emailCheck = email.match(/\S+@\S+\.\S+/);
  const history = useHistory();

  const login = async () => {
    const { REACT_APP_SERVER } = process.env;
    try {
      const request = await axios.post(`${REACT_APP_SERVER}/login`, {
        email,
        password,
      });
      const { data: { user } } = request;
      setIsLogged(true);
      return user.token;
    } catch (error) {
      console.log(error);
      setWrongLogin(true);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const response = await login();
    localStorage.setItem('user', response);
    console.log(response);
  };

  if (isLogged) return <Redirect to="/customer/products" />;

  return (
    <form className="form-login">
      <label className="label" htmlFor="email">
        Email:
        <input
          data-testid="common_login__input-email"
          type="email"
          name="email"
          value={ email }
          className="email"
          placeholder="Digite seu email"
          onChange={ ({ target: { value } }) => setEmail(value) }
          required
        />
      </label>

      <label className="label" htmlFor="password">
        Senha:
        <input
          type="password"
          name="senha"
          data-testid="common_login__input-password"
          value={ password }
          className="senha"
          placeholder="Digite sua senha"
          onChange={ ({ target: { value } }) => setPassword(value) }
          required
        />
      </label>

      <button
        type="submit"
        onClick={ handleClick }
        className="button"
        data-testid="common_login__button-login"
        disabled={ !(password.length >= minPassLength && emailCheck) }
      >
        Entrar
      </button>
      <button
        type="button"
        className="button"
        data-testid="common_login__button-register"
        onClick={ () => history.push('/register') }
      >
        Register
      </button>
      {wrongLogin && (
        <p
          data-testid="common_login__element-invalid-email"
        >
          MESSAGE
        </p>)}
    </form>
  );
};

export default Login;
