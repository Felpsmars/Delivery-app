import React from 'react'

function OrderCard({ order }) {
  return (
    <div>
      <div> pedido { order.id }</div> 
      <div>{ order.status }</div>
      <div>{order.deliveryAdress}, {order.deliveryNumber}</div>
      <div>{ order.saleDate }</div>
      <div>{ order.totalPrice }</div>
    </div>
  )
}

export default OrderCard