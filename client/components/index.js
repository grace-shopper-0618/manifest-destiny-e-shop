/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Navbar } from './navbar'
export { default as UserHome } from './user-home'
export { Login, Signup } from './auth-form'
export { default as AllProducts } from './all-products'
export { default as SingleProduct } from './single-product'
export { AddForm, EditForm } from './product-form'
export { HomePage } from './homepage'
export { default as Cart } from './cart'
<<<<<<< HEAD
export { default as CheckoutAddress } from './checkout-address'
=======
export { default as CheckoutFormWithStripe } from './checkout'
>>>>>>> 8602a2a524f96d433a58bfa3a1ad9a6791f31832
