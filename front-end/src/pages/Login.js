import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Login = () => {
  const [emails, setEmails] = useState("");
  const [passwords, setPasswords] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [wrongLogin, setWrongLogin] = useState(false);

  const login = async (email, password) => {
    try {
      const request = axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      const { data } = await request;
      setIsLogged(true);
      return data.token;
    } catch (error) {
      console.log(error);
      setWrongLogin(true)
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const response = await login(emails, passwords);
    localStorage.setItem("user", response);
    console.log(response);
  };

  if (isLogged) return <Redirect to="/products" />;

  return (
    <form className="form-login">
      <label className="label" htmlFor="email">
        Email:
        <input
          data-testid="common_login__input-email"
          type="email"
          name="email"
          value={emails}
          className="email"
          placeholder="Digite seu email"
          onChange={({ target: { value } }) => setEmails(value)}
          required
        />
      </label>

      <label className="label" htmlFor="password">
        Senha:
        <input
          type="password"
          name="senha"
          data-testid="common_login__input-password"
          value={passwords}
          className="senha"
          placeholder="Digite sua senha"
          onChange={({ target: { value } }) => setPasswords(value)}
          required="true"
        />
      </label>

      <button
        type="submit"
        onClick={handleClick}
        className="button"
        data-testid="common_login__button-login"
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
      {wrongLogin && <span>MESSAGE</span>}
    </form>
  );
};

export default Login;
