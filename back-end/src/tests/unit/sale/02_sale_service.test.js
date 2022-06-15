const chai = require('chai');
const Sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

const saleService = require('../../../api/services/sale');
const db = require('../../../database/models');
const {
  Sale: saleModel,
  SalesProducts: salesProductsModel,
  Product: productModel,
} = require('../../../database/models');
const {
  databaseSale,
  databaseSalesProducts,
  validSale,
  getAllResponse
} = require('../mocks/sale');
const { productList } = require('../mocks/product');

chai.use(sinonChai);
chai.use(chaiAsPromised);
const { expect } = chai;

describe('Teste do SaleService', () => {

  afterEach(() => {
    Sinon.restore();
  });

  describe('Método getAll', () => {
    it('Deve retornar as vendas encontradas pelo banco', async () => {
      Sinon.stub(saleModel, 'findAll').resolves([databaseSale]);
      Sinon.stub(salesProductsModel, 'findAll').resolves(databaseSalesProducts);
      Sinon.stub(productModel, 'findOne')
        .onFirstCall().resolves(productList[0])
        .onSecondCall().resolves(productList[1]);

      const response = await saleService.getAll(3);
  
      expect(response).to.be.deep.equal(getAllResponse);
    });
  });

  describe('Método getBySeller', () => {
    it('Deve retornar as vendas encontradas pelo banco', async () => {
      Sinon.stub(saleModel, 'findAll').resolves([databaseSale]);
      Sinon.stub(salesProductsModel, 'findAll').resolves(databaseSalesProducts);
      Sinon.stub(productModel, 'findOne')
        .onFirstCall().resolves(productList[0])
        .onSecondCall().resolves(productList[1]);

      const response = await saleService.getBySeller(2);
  
      expect(response).to.be.deep.equal(getAllResponse);
    });
  });

  describe('Método create', () => {
    it('Deve criar e retornar a venda criada', async () => {
      Sinon.stub(saleModel, 'create').resolves(databaseSale[0]);
      Sinon.stub(salesProductsModel, 'create')
        .onFirstCall().resolves(databaseSalesProducts[0])
        .onSecondCall().resolves(databaseSalesProducts[1]);
      Sinon.stub(db.sequelize, 'transaction').resolves({
        commit: () => {}
      });

      const response = await saleService.create(validSale);
  
      expect(response).to.be.deep.equal({
        ...databaseSale[0].dataValues,
        products: validSale.products
      });
    });
  });

  describe('Método updateStatus', () => {
    it('Deve atualizar o status de uma venda existente', async () => {
      const modelStub = Sinon.stub(saleModel, 'update').resolves({ ...databaseSale[0], status: 'Entregue' });

      const response = await saleService.updateStatus(1, 'Entregue');
  
      expect(response).to.be.deep.equal({
        ...databaseSale[0],
        status: 'Entregue',
      });
      expect(modelStub).to.have.been.calledWithExactly(
        { status: 'Entregue' },
        { where: { id: 1 } },
      );
    });
  });
});