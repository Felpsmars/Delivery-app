import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../provider/UserProvider';
import appIcon from '../assets/app-icon.jpg';
import style from './style/Login.module.css';

const Login = () => {
  const { user, updateUser, isUserValid } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [wrongLogin, setWrongLogin] = useState(false);

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
      console.log('Error in login: ', error);
      setWrongLogin(true);
    }
  };

  const areFieldsValid = (
    emailCheck
    && password.length >= MIN_PASS_LENGTH
  );

  useEffect(() => {
    if (isLogged || isUserValid) {
      const { role } = user;
      switch (role) {
      case 'admin':
        return navigate('/admin');
      case 'seller':
        return navigate('/seller/orders');
      default:
        return navigate('/customer/products');
      }
    }
  }, [isLogged, navigate, isUserValid, user]);

  return (
    <div className={ style.loginContainer }>
      <img src={ appIcon } alt="app logo" className={ style.appIcon } />
      <h1>Delivery App</h1>
      <form className={ style.loginForm }>
        <label className={ style.loginLabel } htmlFor="email">
          Login
          <input
            data-testid="common_login__input-email"
            type="email"
            name="email"
            value={ email }
            className="email"
            placeholder="email@trybeer.com.br"
            onChange={ ({ target: { value } }) => setEmail(value) }
            required
          />
        </label>

        <label className={ style.loginLabel } htmlFor="password">
          Senha
          <input
            type="password"
            name="senha"
            data-testid="common_login__input-password"
            value={ password }
            className="senha"
            placeholder="***********"
            onChange={ ({ target: { value } }) => setPassword(value) }
            required
          />
        </label>
        <div className={ style.formButtonContainer }>
          <button
            type="button"
            onClick={ login }
            className={ style.formLoginButton }
            data-testid="common_login__button-login"
            disabled={ !areFieldsValid }
          >
            LOGIN
          </button>
          <button
            type="button"
            className={ style.formRegisterButton }
            data-testid="common_login__button-register"
            onClick={ () => navigate('/register') }
          >
            Ainda não tenho conta
          </button>
        </div>
      </form>
      {wrongLogin && (
        <p
          data-testid="common_login__element-invalid-email"
          className={ style.loginError }
        >
          Usuário ou senha inválidos!
        </p>)}
    </div>
  );
};

export default Login;
