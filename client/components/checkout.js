import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
// import axios from 'axios'

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false
    }
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    console.log('clicking send button')
    
    ev.preventDefault()
    let {token} = await this.props.stripe.createToken({name: "Name"});
    let response = await fetch("/charge", {
    method: "POST",
    headers: {"Content-Type": "text/plain"},
    body: token.id
  });

  if (response.ok) this.setState({
    complete: true
  })

  // send PUT request to change orders isActiveCart property
  }

  render() {
    console.log('this is the state after clicking', this.state)
    if (this.state.complete) return <h1>Purchase Complete</h1>
    return (
        <div className="checkout">
          <p>Would you like to complete the purchase?</p>
          <CardElement />
          <button onClick={this.submit}>Send</button>
        </div>
    );
  }
}

const CheckoutFormWithStripe = injectStripe(CheckoutForm)
export default CheckoutFormWithStripe