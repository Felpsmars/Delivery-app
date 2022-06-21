const chai = require('chai');
const Sinon = require('sinon');
const sinonChai = require('sinon-chai');

const userController = require('../../../api/controllers/user');
const userService = require('../../../api/services/user');
const { databaseUser, validUser } = require('../mocks/user');

chai.use(sinonChai);
const { expect } = chai;

describe('Teste do UserController', () => {
  let resMock;
  
  beforeEach(() => {
    resMock = Sinon.spy({ status: () => resMock, json: () => resMock });
  });

  afterEach(() => {
    Sinon.restore();
  });

  describe('Método getAllByRole', () => {
    it('Deve retornar status 200 com os usuários', async () => {
      const reqMock = { params: { role: 'customer' } };
      const serviceStub = Sinon.stub(userService, 'getAllByRole').resolves([databaseUser]);
      
      await userController.getAllByRole(reqMock, resMock);
  
      expect(resMock.status).to.have.been.calledWith(200);
      expect(resMock.json).to.have.been.calledWith([databaseUser]);
      expect(serviceStub).to.have.been.calledWith('customer');
    });
  });

  describe('Método login', () => {
    it('Método login deve retornar status 200 com o usuário', async () => {
      const reqMock = { body: 
        { email: 'zebirita@email.com', password: '$#zebirita#$' }
      };
      const serviceStub = Sinon.stub(userService, 'login').resolves(databaseUser);
      
      await userController.login(reqMock, resMock);
  
      expect(resMock.status).to.have.been.calledWith(200);
      expect(resMock.json).to.have.been.calledWith({ user: databaseUser });
      expect(serviceStub).to.have.been.calledWith({ ...reqMock.body });
    });
  });

  describe('Método create', () => {
    it('Deve retornar status 201 com o usuário', async () => {
      const reqMock = { body: { ...validUser } };
      const serviceStub = Sinon.stub(userService, 'create').resolves(databaseUser);
      
      await userController.create(reqMock, resMock);
  
      expect(resMock.status).to.have.been.calledWith(201);
      expect(resMock.json).to.have.been.calledWith({ user: databaseUser });
      expect(serviceStub).to.have.been.calledWith({ ...reqMock.body });
    });
  });

  describe('Método validateToken', () => {
    it('Deve retornar status 200', async () => {
      await userController.validateToken({}, resMock);
  
      expect(resMock.status).to.have.been.calledWith(200);
    });
  });
});