import { expect } from 'chai'
import AuthHelper from '../helpers/auth.helper'

describe('Auth', function() {
  describe('Successful log in', function() {
    let authHelper = new AuthHelper()

    before(async function() {
      await authHelper.logIn(process.env.LOGIN, process.env.PASSWORD)
    })

    it('response status code is 200', function() {
      expect(authHelper.response.status).to.eq(200)
    })

    it('response body contains authorization token', function() {
      expect(authHelper.response.body.token).not.to.be.undefined
    })
  })

  describe('Log in with invalid credentials', function() {
    let authHelper = new AuthHelper()

    before(async function() {
      await authHelper.logIn('invalid', 'invalid')
    })

    it('response status code is 404', function() {
      expect(authHelper.response.status).to.eq(404)
    })

    it('response body contains error message', function() {
      expect(authHelper.response.body.message).to.eq('Wrong login or password.')
    })
  })
})