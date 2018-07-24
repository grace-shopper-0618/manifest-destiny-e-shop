/* global describe beforeEach afterEach it */

import {expect} from 'chai'
//import thunks here
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {product: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

//tests N/A at this point... 
//   describe('me', () => {
//     it('eventually dispatches the GET USER action', async () => {
//       const fakeUser = {email: 'Cody'}
//       mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)
//       await store.dispatch(me())
//       const actions = store.getActions()
//       expect(actions[0].type).to.be.equal('GET_USER')
//       expect(actions[0].product).to.be.deep.equal(fakeUser)
//     })
//   })

})
