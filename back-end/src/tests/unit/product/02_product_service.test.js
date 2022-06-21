const chai = require('chai');
const Sinon = require('sinon');
const sinonChai = require('sinon-chai');

const productService = require('../../../api/services/product');
const { Product: productModel } = require('../../../database/models');
const { productList } = require('../mocks/product');

chai.use(sinonChai);
const { expect } = chai;

describe('Teste do ProductService', () => {

  afterEach(() => {
    Sinon.restore();
  });

  describe('Método getAll', () => {
    it('Deve retornar os produtos do banco de dados', async () => {
      const modelStub = Sinon.stub(productModel, 'findAll').resolves(productList);
      
      const response = await productService.getAll();
  
      expect(response).to.be.deep.equal(productList);
      expect(modelStub).to.have.been.called;
    });
  });

  describe('Método getById', () => {
    it('Deve retornar o produto quando existe', async () => {
      const product = productList[0];
      const modelStub = Sinon.stub(productModel, 'findByPk').resolves(product);
      
      const response = await productService.getById(product.id);
  
      expect(response).to.be.deep.equal(product);
      expect(modelStub).to.have.been.calledWith(product.id);
    });
  
    it('Deve lançar erro quando o produto não existe', async () => {
      Sinon.stub(productModel, 'findByPk').resolves(null);
  
      try {
        const response = await productService.getById(1);
        expect(response).to.be.undefined;
      } catch (e) {
        expect(e).to.be.an('object');
      }
    });
  });
});