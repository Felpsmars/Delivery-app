const chai = require('chai');
const Sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

const { hashPassword } = require('../../../api/utils/auth');

const userService = require('../../../api/services/user');
const { User: userModel } = require('../../../database/models');
const { databaseUser, validUser } = require('../mocks/user');

chai.use(sinonChai);
chai.use(chaiAsPromised);
const { expect } = chai;

describe('Teste do UserService', () => {
  const { dataValues: { password, ...publicDbUser } } = databaseUser;

  afterEach(() => {
    Sinon.restore();
  });

  describe('Método getAllByRole', () => {
    it('Deve retornar os usuários encontrados pelo banco', async () => {
      const modelStub = Sinon.stub(userModel, 'findAll').resolves([databaseUser]);
      const response = await userService.getAllByRole('seller');
  
      expect(response).to.be.deep.equal([publicDbUser]);
      expect(modelStub).to.have.been.calledWithExactly({ where: { role: 'seller' } });
    });
  });

  describe('Método login', () => {
    it('Deve retornar o usuário encontrado pelo banco + token', async () => {
      Sinon.stub(userModel, 'findOne').resolves(databaseUser);
      
      const response = await userService.login(validUser);

      expect(response).to.contain({ ...publicDbUser });
      expect(response).to.contain.keys(['token']);
    });
  
    it('Deve lançar erro em caso de usuário não encontrado', async () => {
      Sinon.stub(userModel, 'findOne').resolves(null);
      
      await expect(userService.login(validUser)).to.eventually.be.rejected;
    });
  
    it('Deve lançar erro em caso de usuário não encontrado com email e senha', async () => {
      Sinon.stub(userModel, 'findOne')
        .withArgs({ where: { email: validUser.email } }).resolves(databaseUser)
        .withArgs({ where:
          { email: validUser.email, password: hashPassword(validUser.password) }
        }).resolves(null);
  
      await expect(userService.login(validUser)).to.eventually.be.rejected;
    });
  });

  describe('Método create', () => {
    it('Deve criar um usuário e retorná-lo junto de um token', async () => {
      Sinon.stub(userModel, 'findOne').resolves(null);
      Sinon.stub(userModel, 'create').resolves(databaseUser);

      const response = await userService.create(validUser);

      expect(response).to.contain({ ...publicDbUser });
      expect(response).to.contain.keys(['token']);
    });

    it('Deve lançar erro em caso de usuário já existente', async () => {
      Sinon.stub(userModel, 'findOne').resolves(databaseUser);

      await expect(userService.create(validUser)).to.be.rejected;
    });
  });


});