import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../provider/UserProvider';
import style from './style/CreateUser.module.css';
import appIcon from '../assets/app-icon.jpg';

const CreateUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [wrongLoginRegister, setWrongLoginRegister] = useState(false);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const MIN_NAME_LENGTH = 12;
  const MIN_PASS_LENGTH = 6;
  const emailCheck = email.match(/\S+@\S+\.\S+/);

  const create = async () => {
    const { REACT_APP_SERVER } = process.env;
    try {
      const request = await axios.post(`${REACT_APP_SERVER}/register`, {
        name,
        email,
        password,
      });
      updateUser(request.data.user);
      navigate('/customer/products');
    } catch (error) {
      console.log(error);
      setWrongLoginRegister(true);
    }
  };

  const areFieldsValid = (
    name.length >= MIN_NAME_LENGTH
    && password.length >= MIN_PASS_LENGTH
    && emailCheck
  );

  useEffect(() => {
    document.title = 'Cadastro - Delivery App';
  }, []);

  return (
    <div className={ style.createUserContainer }>
      <img src={ appIcon } alt="app logo" className={ style.appIcon } />
      <h1>Cadastro - Delivery App</h1>
      <form className={ style.createUserForm }>
        <label className={ style.createUserLabel } htmlFor="email">
          Nome
          <input
            data-testid="common_register__input-name"
            type="text"
            name="name"
            value={ name }
            placeholder="Seu nome"
            onChange={ ({ target: { value } }) => setName(value) }
            required
          />
        </label>

        <label className={ style.createUserLabel } htmlFor="email">
          Email
          <input
            data-testid="common_register__input-email"
            type="email"
            name="email"
            value={ email }
            placeholder="seu-email@site.com.br"
            onChange={ ({ target: { value } }) => setEmail(value) }
            required
          />
        </label>

        <label className={ style.createUserLabel } htmlFor="password">
          Senha
          <input
            type="password"
            name="senha"
            data-testid="common_register__input-password"
            value={ password }
            placeholder="***********"
            onChange={ ({ target: { value } }) => setPassword(value) }
            required
          />
        </label>

        <button
          type="button"
          onClick={ create }
          className={ style.formRegisterButton }
          data-testid="common_register__button-register"
          disabled={ !areFieldsValid }
        >
          CADASTRAR
        </button>
      </form>
      {wrongLoginRegister && (
        <p
          data-testid="common_register__element-invalid_register"
        >
          Não foi possível efetuar cadastro
        </p>)}
    </div>
  );
};

export default CreateUser;
