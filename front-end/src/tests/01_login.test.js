import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import App from '../App';
import Login from '../pages/Login';
import renderWithRouter from './renderWithRouter';


describe('Teste da tela de login', () => {
  let history;
  
  beforeEach(() => {
    history = renderWithRouter(<Login />).history;
  });
  
  test('Testa se os elementos estão na tela', () => {
    const emailInput = screen.getByRole('')
    expect(emailInput).toBeInTheDocument();
  });

  test('Testa se é possível digitar e alterar os valores dos elementos', () => {

  });

  test('Testa se é possível fazer o login', () => {

  });
});
