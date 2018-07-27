import React from 'react'
import {connect} from 'react-redux'
import {getCartFromDb} from '../store/cart'

class Cart extends React.Component {
    constructor() {
        super()
        this.state = {
            cartProducts: []
        }
    }

    componentDidMount() {
        const products = getCartFromDb()
        this.setState(products)
    }

    handleDelete() {

    }

    handleQuantityChange() {

    }

    render() {
        const cartProducts = this.props.cartProducts
        return (
            <div>
                <h3>Your Cart</h3>
                <ul>
                    {
                        cartProducts.map((product) => {
                            return (
                                <li key={product.id}>{product.title}</li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

const mapState = state => {

}

const mapDispatch = dispatch => {

}

export default connect(mapState, mapDispatch)(Cart)