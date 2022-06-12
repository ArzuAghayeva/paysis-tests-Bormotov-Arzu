import UsersHelper from '../helpers/users.helper'

describe('Transactions', function() {
  describe('Transaction creation', function() {
    let usersHelper = new UsersHelper()
    let userFromBefore
    let userToBefore
    let userFromAfter
    let userToAfter

    before(async function() {
      await usersHelper.create()
      userFromBefore = usersHelper.response.body
      await usersHelper.create()
      userToBefore = usersHelper.response.body
      await transactionsHelper.create(userFromBefore.id, userToBefore.id, 100)
      await usersHelper.get(userFromBefore.id)
      userFromAfter = usersHelper.response.body
      await usersHelper.get(userToBefore.id)
      userToAfter = usersHelper.response.body
    })
  })
})