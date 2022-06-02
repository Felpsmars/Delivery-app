import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const Login = () => {
  const [emails, setEmails] = useState('');
  const [passwords, setPasswords] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [wrongLogin, setWrongLogin] = useState(false);
  const minPassLength = 6;
  const emailCheck = emails.match(/\S+@\S+\.\S+/);
  const login = async (email, password) => {
    const { REACT_APP_SERVER } = process.env;
    try {
      const request = await axios.post(`${REACT_APP_SERVER}/login`, {
        email,
        password,
      });
      // const request = await fetch(`${REACT_APP_SERVER}/login`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     email,
      //     password,
      //   }),
      // });
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
    console.log(emails);
    console.log(passwords);
    const response = await login(emails, passwords);
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
          value={ emails }
          className="email"
          placeholder="Digite seu email"
          onChange={ ({ target: { value } }) => setEmails(value) }
          required
        />
      </label>

      <label className="label" htmlFor="password">
        Senha:
        <input
          type="password"
          name="senha"
          data-testid="common_login__input-password"
          value={ passwords }
          className="senha"
          placeholder="Digite sua senha"
          onChange={ ({ target: { value } }) => setPasswords(value) }
          required="true"
        />
      </label>

      <button
        type="submit"
        onClick={ handleClick }
        className="button"
        data-testid="common_login__button-login"
        disabled={ !(passwords.length >= minPassLength && emailCheck) }
      >
        Entrar
      </button>
      <button
        type="submit"
        className="button"
        data-testid="common_login__button-register"
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
