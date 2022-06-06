import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../provider/UserProvider';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [wrongLogin, setWrongLogin] = useState(false);
  const { user, updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const MIN_PASS_LENGTH = 6;
  const emailCheck = email.match(/\S+@\S+\.\S+/);

  const login = async () => {
    const { REACT_APP_SERVER } = process.env;
    try {
      const request = await axios.post(`${REACT_APP_SERVER}/login`, {
        email,
        password,
      });
      const { data: { user: newUser } } = request;
      updateUser(newUser);
      setIsLogged(true);
    } catch (error) {
      console.log(error);
      setWrongLogin(true);
    }
  };

  const areFieldsValid = (
    emailCheck
    && password.length >= MIN_PASS_LENGTH
  );

  useEffect(() => {
    console.log(isLogged);
    if (isLogged) {
      navigate('/customer/products');
    }
  }, [isLogged, navigate]);

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
        type="button"
        onClick={ login }
        className="button"
        data-testid="common_login__button-login"
        disabled={ !areFieldsValid }
      >
        Entrar
      </button>
      <button
        type="button"
        className="button"
        data-testid="common_login__button-register"
        onClick={ () => navigate('/register') }
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
