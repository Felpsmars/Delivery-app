import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../provider/UserProvider';

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

  return (
    <form className="form-login">
      <label className="label" htmlFor="email">
        Nome:
        <input
          data-testid="common_register__input-name"
          type="text"
          name="name"
          value={ name }
          className="email"
          placeholder="Digite seu nome"
          onChange={ ({ target: { value } }) => setName(value) }
          required
        />
      </label>

      <label className="label" htmlFor="email">
        Email:
        <input
          data-testid="common_register__input-email"
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
          data-testid="common_register__input-password"
          value={ password }
          className="senha"
          placeholder="Digite sua senha"
          onChange={ ({ target: { value } }) => setPassword(value) }
          required
        />
      </label>

      <button
        type="button"
        onClick={ create }
        className="button"
        data-testid="common_register__button-register"
        disabled={ !areFieldsValid }
      >
        Registrar
      </button>

      {wrongLoginRegister && (
        <p
          data-testid="common_register__element-invalid_register"
        >
          MESSAGE
        </p>)}
    </form>
  );
};

export default CreateUser;
