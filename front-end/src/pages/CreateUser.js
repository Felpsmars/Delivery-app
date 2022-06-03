import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
  const [emails, setEmails] = useState('');
  const [passwords, setPasswords] = useState('');
  const [names, setNames] = useState('');
  const [wrongLoginRegister, setWrongLoginRegister] = useState(false);
  const minPassLength = 6;
  const emailCheck = emails.match(/\S+@\S+\.\S+/);
  const create = async (name, email, password) => {
    const { REACT_APP_SERVER } = process.env;
    try {
      const request = await axios.post(`${REACT_APP_SERVER}/register`, {
        name,
        email,
        password,
      });

      console.log(request);
    } catch (error) {
      console.log(error);
      setWrongLoginRegister(true);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();

    create([names, emails, passwords]);
  };

  return (
    <form className="form-login">
      <label className="label" htmlFor="email">
        Nome:
        <input
          data-testid="common_register__input-name"
          type="text"
          name="name"
          value={ names }
          className="email"
          placeholder="Digite seu nome"
          onChange={ ({ target: { value } }) => setNames(value) }
          required
        />
      </label>

      <label className="label" htmlFor="email">
        Email:
        <input
          data-testid="common_register__input-email"
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
          data-testid="common_register__input-password"
          value={ passwords }
          className="senha"
          placeholder="Digite sua senha"
          onChange={ ({ target: { value } }) => setPasswords(value) }
          required
        />
      </label>

      <button
        type="submit"
        onClick={ handleClick }
        className="button"
        data-testid="common_register__button-register"
        disabled={ !(passwords.length >= minPassLength && emailCheck) }
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
