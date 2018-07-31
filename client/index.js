import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import {StripeProvider, Elements} from 'react-stripe-elements'

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <StripeProvider apiKey="pk_test_N9xOk59GefALcD2w6r95rFab">
        <Elements>
          <App />
        </Elements>
      </StripeProvider>
    </Router>
  </Provider>,
  document.getElementById('app')
)
