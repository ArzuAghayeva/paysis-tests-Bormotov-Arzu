import { expect } from 'chai'

describe('Operations with numbers', function() {
  const a = 5
  const b = 7

  it('addition works properly', function() {
    expect(a + b).to.eq(12)
  })

  it('subtraction works correctly', function() {
    expect(a - b).to.eq(-2)
  })
})