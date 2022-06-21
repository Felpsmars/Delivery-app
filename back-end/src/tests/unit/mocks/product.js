const productMockOne = {
  id: 1,
    name: 'Skol Lata 250ml',
    price: 2.20,
    url_image: 'http://localhost:3001/images/skol_lata_350ml.jpg',
};

const productMockTwo = {
  id: 2,
  name: 'Heineken 600ml',
  price: 7.50,
  url_image: 'http://localhost:3001/images/heineken_600ml.jpg',
};

const productList = [
  {
    ...productMockOne,
    dataValues: {
      ...productMockOne,
    }
  },
  {
    ...productMockTwo,
    dataValues: {
      ...productMockTwo,
    }
  }
];

module.exports = {
  productList,
};