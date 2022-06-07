'use strict';

module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('sales', [
      {
        user_id: 3,
        seller_id: 3,
        total_price: 50.55,
        delivery_address: 'Rua do fulano, 410',
        delivery_number:'219999999',
        sale_date:'2022/07/12',
        

      },
      
    ], {});
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('Sales', null, {});
  }
};
