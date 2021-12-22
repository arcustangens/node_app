const express = require('express')
const bodyParser = require('body-parser')
const res = require('express/lib/response')
const app = express()

const database = require('./database.js')

let conn

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

app.post('/form', (req, res) => {
  console.log(req.body)
  res.send()
})

app.get('/kontrahenci', async (req, res) => {
  try {
    const data = await conn.query('SELECT * FROM kontrahenci;')
    const parsedData = data.map(({ id, kontrahent }) => ({
      value: id,
      label: kontrahent,
    }))
    res.send(parsedData)
  } catch (err) {
    res.status(404).send(err)
  }
})
app.post('/kontrahenci', async (req, res) => {
  try {
    const { kontrahent, akronim } = req.body

    await conn.query('INSERT INTO kontrahenci value (?, ?, ?)', [
      null,
      kontrahent,
      akronim,
    ])

    res.sendStatus(200)
  } catch (err) {
    res.status(400).send(err)
  }
})

app.get('/materialy', async (req, res) => {
  try {
    const data = await conn.query('SELECT * FROM materialy;')
    const parsedData = data.map(({ id, material }) => ({
      value: id,
      label: material,
    }))
    res.send(parsedData)
  } catch (err) {
    res.status(404).send(err)
  }
})
app.post('/materialy', async (req, res) => {
  try {
    const { material } = req.body

    await conn.query('INSERT INTO materialy value (?, ?)', [null, material])

    res.sendStatus(200)
  } catch (err) {
    res.status(400).send(err)
  }
})

app.get('/typ_wymiaru', async (req, res) => {
  try {
    const data = await conn.query('SELECT * FROM typ_wymiaru;')
    const parsedData = data.map(({ id, typ }) => ({
      value: id,
      label: typ,
    }))
    res.send(parsedData)
  } catch (err) {
    res.status(404).send(err)
  }
})
app.post('/typ_wymiaru', async (req, res) => {
  try {
    const { typWymiaru } = req.body

    await conn.query('INSERT INTO typ_wymiaru value (?, ?)', [null, typWymiaru])

    res.sendStatus(200)
  } catch (err) {
    res.status(400).send(err)
  }
})

const main = async () => {
  conn = await database.establishConnection()
  app.listen(3000, function () {
    console.log('listening on 3000')
  })
}

main()
