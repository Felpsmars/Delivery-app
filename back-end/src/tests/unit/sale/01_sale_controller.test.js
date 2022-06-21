const chai = require('chai');
const Sinon = require('sinon');
const sinonChai = require('sinon-chai');

const saleController = require('../../../api/controllers/sale');
const saleService = require('../../../api/services/sale');
const { databaseSale, validSale } = require('../mocks/sale');

chai.use(sinonChai);
const { expect } = chai;

describe('Teste do SaleController', () => {
  let resMock;
  
  beforeEach(() => {
    resMock = Sinon.spy({ status: () => resMock, json: () => resMock });
  });

  afterEach(() => {
    Sinon.restore();
  });

  describe('Método create', () => {
    it('Deve retornar status 201 com a venda', async () => {
      resMock.locals = { ...validSale };
      const reqMock = { params: { id: validSale.userId } };
      const serviceStub = Sinon.stub(saleService, 'create').resolves(databaseSale[0]);
      
      await saleController.create(reqMock, resMock);
  
      expect(resMock.status).to.have.been.calledWith(201);
      expect(resMock.json).to.have.been.calledWith(databaseSale[0]);
      expect(serviceStub).to.have.been.calledWith(validSale);
    });
  });

  describe('Método getAll', () => {
    it('Deve retornar status 200 com as vendas', async () => {
      const reqMock = { params: { id: validSale.userId } };
      const serviceStub = Sinon.stub(saleService, 'getAll').resolves(databaseSale);
      
      await saleController.getAll(reqMock, resMock);
  
      expect(resMock.status).to.have.been.calledWith(200);
      expect(resMock.json).to.have.been.calledWith(databaseSale);
      expect(serviceStub).to.have.been.calledWith(validSale.userId);
    });
  });

  describe('Método getBySeller', () => {
    it('Deve retornar status 200 com as vendas', async () => {
      const reqMock = { params: { sellerId: validSale.sellerId } };
      const serviceStub = Sinon.stub(saleService, 'getBySeller').resolves(databaseSale);
      
      await saleController.getBySeller(reqMock, resMock);
  
      expect(resMock.status).to.have.been.calledWith(200);
      expect(resMock.json).to.have.been.calledWith(databaseSale);
      expect(serviceStub).to.have.been.calledWith(validSale.sellerId);
    });
  });

  describe('Método updateStatus', () => {
    it('Deve retornar status 200', async () => {
      const saleId = databaseSale[0].id;
      const reqMock = {
        params: { id: saleId },
        body: { status: 'Preparando' },
      };
      const serviceStub = Sinon.stub(saleService, 'updateStatus').resolves('OK');
      
      await saleController.updateStatus(reqMock, resMock);
  
      expect(resMock.status).to.have.been.calledWith(200);
      expect(serviceStub).to.have.been.calledWith(saleId, 'Preparando');
    });
  });
});