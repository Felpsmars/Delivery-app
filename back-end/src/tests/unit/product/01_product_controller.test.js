const chai = require('chai');
const Sinon = require('sinon');
const sinonChai = require('sinon-chai');

const productController = require('../../../api/controllers/product');
const productService = require('../../../api/services/product');
const { productList } = require('../mocks/product');

chai.use(sinonChai);
const { expect } = chai;

describe('Teste do ProductController', () => {
  let resMock;
  
  beforeEach(() => {
    resMock = Sinon.spy({ status: () => resMock, json: () => resMock });
  });

  afterEach(() => {
    Sinon.restore();
  });

  describe('Método getAll', () => {
    it('Deve retornar status 200 e os produtos via JSON', async () => {
      Sinon.stub(productService, 'getAll').resolves(productList);
      
      await productController.getAll({}, resMock);
  
      expect(resMock.status).to.have.been.calledWith(200);
      expect(resMock.json).to.have.been.calledWith(productList);
    });
  });

  describe('Método getById', () => {
    it('Deve retornar status 200 e o produto via JSON', async () => {
      const product = productList[0];
      const reqMock = { params: { id: product.id } };
      const serviceStub = Sinon.stub(productService, 'getById').resolves(product);
      
      await productController.getById(reqMock, resMock);
  
      expect(resMock.status).to.have.been.calledWith(200);
      expect(resMock.json).to.have.been.calledWith(product);
      expect(serviceStub).to.have.been.calledWith(product.id);
    });
  });
});