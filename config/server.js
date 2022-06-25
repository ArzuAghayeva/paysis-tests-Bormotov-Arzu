import express from 'express'
import bodyParser from 'body-parser'
import responses from './responses.json'

function start(port) {
  const app = express()
  let server
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.post('/auth', async function(req, res) {
    const login = req.body.login
    const password = req.body.password
    if (login === process.env.LOGIN && password === process.env.PASSWORD)
      await res.status(200).send(responses.auth.valid)
    else
      await res.status(404).send(responses.auth.invalid)
  })

  app.post('/users', async function(req, res) {
    await res.status(200).send(responses.users.create)
  })

  app.get('/users', async function(req, res) {
    const id = req.query.id
    if (id)
      await res.status(200).send({ id: id, amount: 1000 })
    else
      await res.status(200).send(responses.users.getAll)
  })

  app.delete('/users', async function(req, res) {
    await res.status(200).send(responses.users.delete)
  })

  before(async function() {
    server = await app.listen(port)
    console.log(`Mock server is running on port ${port}`)
  })

  after(function() {
    server.close()
  })
}

export { start }