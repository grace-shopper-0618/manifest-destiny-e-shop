import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAllOrders, changeOrderToShipped } from '../store/orders';
import { Order } from './order'
import CategoryForm from './new-category-form'

class Dashboard extends Component {

  componentDidMount(){
    this.props.fetchOrders()
  }

  render(){
    const { orders, sendOutOrder } = this.props
    return (
    <div>
      <h2>Welcome to the Admin Dashboard!</h2>
      <h3> Submit a New Category </h3>
      <CategoryForm />

      <h3> All Orders: </h3>

      {
        orders.map(order => (
          <div key={order.id} >
            <h4>user: {order.user.email}, order status: {order.isActiveCart ? 'active' : 'processed'}, total: {order.finalTotal}</h4>
            <Order order={order} />
            {
              !order.hasShipped && !order.isActiveCart ? <button onClick={evt => sendOutOrder(evt, order)}>Ship</button> : null
            }
          </div>)
        )
      }

    </div>
    )
  }
}

// CONNECTED COMPONENT

const mapState = state => ({
  orders: state.orders,
  user: state.user
})

const mapDispatch = dispatch => ({
  fetchOrders: () => dispatch(fetchAllOrders()),
  sendOutOrder: (evt, order) => {
    evt.preventDefault()
    if (!order.isActiveCart) dispatch(changeOrderToShipped(order))
  },
})

export default connect(mapState, mapDispatch)(Dashboard)
