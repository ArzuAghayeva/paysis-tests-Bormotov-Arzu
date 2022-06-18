import supertest from 'supertest'

function create(from, to, amount) {
  const body = {
    from,
    to,
    amount
  }
  return supertest(process.env.BASE_URL)
    .post('/transactions')
    .set('Authorization', `Bearer ${process.env.TOKEN}`)
    .send(body)
}

export { create }