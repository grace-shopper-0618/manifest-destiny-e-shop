import React from 'react'

export const Order = (props) => {
  const { order } = props
  return (
    <div id="order" key={order.id} >
    <h5>{order.createdAt}</h5>
    {
      order['line-items'].map(item => {
        const product = item.product
        return (
          <div id="product" key={product.id}>
            <p>Item: {product.title}</p>
            <p>Price: ${product.price}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
        )
      })
    }
    </div>
  )
}
