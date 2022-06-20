import UsersHelper from '../helpers/users.helper'
import * as transactionsHelper from '../helpers/transactions.helper'
import { expect } from 'chai'

describe('Transactions', function() {
  describe('Transaction creation', function() {
    let usersHelper = new UsersHelper()
    let userFromBefore
    let userToBefore
    let userFromAfter
    let userToAfter
    let transaction
    let amount = 100

    before(async function() {
      await usersHelper.create()
      userFromBefore = usersHelper.response.body
      await usersHelper.create()
      userToBefore = usersHelper.response.body
      transaction = await transactionsHelper.create(userFromBefore.id, userToBefore.id, amount)
      await usersHelper.get(userFromBefore.id)
      userFromAfter = usersHelper.response.body
      await usersHelper.get(userToBefore.id)
      userToAfter = usersHelper.response.body
    })

    it('response status code is 200', function() {
      expect(transaction.status).to.eq(200)
    })

    it('response body contains transaction id', function() {
      expect(transaction.body.id).to.be.a('string')
    })

    it('response body contains id of sender', function() {
      expect(transaction.body.from).to.eq(userFromBefore.id)
    })

    it('response body contains id of receiver', function() {
      expect(transaction.body.to).to.eq(userToBefore.id)
    })

    it('response body contains transaction amount', function() {
      expect(transaction.body.amount).to.eq(amount)
    })

    it('sender has amount deducted', function() {
      expect(userFromAfter.amount).to.eq(userFromBefore.amount - amount)
    })

    it('receiver has amount added', function() {
      expect(userToAfter.amount).to.eq(userToBefore.amount + amount)
    })
  })

  describe('Get single transaction', function() {
    let usersHelper = new UsersHelper()
    let userFrom
    let userTo
    let transaction
    let getTransaction
    const amount = 100

    before(async function() {
      await usersHelper.create()
      userFrom = usersHelper.response.body.id
      await usersHelper.create()
      userTo = usersHelper.response.body.id
      transaction = await transactionsHelper.create(userFrom, userTo, amount)
      getTransaction = await transactionsHelper.get(transaction.body.id)
    })

    it('response status code is 200', function() {
      expect(getTransaction.status).to.eq(200)
    })

    it('response body contains transaction id', function() {
      expect(getTransaction.body.id).to.eq(transaction.body.id)
    })

    it('response body contains id of sender', function() {
      expect(getTransaction.body.from).to.eq(userFrom)
    })

    it('response body contains id of receiver', function() {
      expect(getTransaction.body.to).to.eq(userTo)
    })
  })
})