const express = require('express')
const bodyParser = require('body-parser')
const res = require('express/lib/response')
const multer = require('multer')

const app = express()

const database = require('./database.js')

let conn

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, { fieldname, originalname }, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const extension = originalname.split('.').at(-1)
    cb(null, `${fieldname}-${uniqueSuffix}.${extension}`)
  },
})
const upload = multer({ storage })

app.use('/uploads', express.static('uploads'))

app.post(
  '/form',
  upload.fields([
    { name: 'plik', maxCount: 1 },
    { name: 'plikThumbnail', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { plik, plikThumbnail } = req.files
      const {
        kontrahent,
        numer,
        typWymiaru,
        a,
        b,
        c,
        d,
        e,
        f,
        nazwa,
        material,
        uwagi,
      } = req.body

      const parsedA = parseFloat(a) || null
      const parsedB = parseFloat(b) || null
      const parsedC = parseFloat(c) || null
      const parsedD = parseFloat(d) || null
      const parsedE = parseFloat(e) || null
      const parsedF = parseFloat(f) || null

      const queryRes = await conn.query(
        'INSERT INTO records value (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id',
        [
          null,
          kontrahent,
          numer,
          typWymiaru,
          parsedA,
          parsedB,
          parsedC,
          parsedD,
          parsedE,
          parsedF,
          nazwa,
          material,
          uwagi,
          plik[0].filename,
          plikThumbnail[0].filename,
        ]
      )

      res.send({
        id: queryRes[0].id,
        kontrahent,
        numer,
        typ: typWymiaru,
        parsedA,
        parsedB,
        parsedC,
        parsedD,
        parsedE,
        parsedF,
        nazwa,
        material,
        uwagi,
        plik: plik[0].filename,
        plik_thumbnail: plikThumbnail[0].filename,
      })
    } catch (err) {
      console.log(err)
      res.status(404).send(err)
    }
  }
)
app.get('/records', async (req, res) => {
  try {
    const data = await conn.query(
      `SELECT r.id, k.kontrahent, r.numer, t.typ, r.a, r.b, r.c, r.d, r.e, r.f, r.nazwa, m.material, r.uwagi, r.plik, r.plik_thumbnail FROM records r
      LEFT JOIN kontrahenci k ON r.id_kontrahenta = k.id
      LEFT JOIN typ_wymiaru t ON r.id_typu_wymiaru = t.id
      LEFT JOIN materialy m ON r.id_materialu = m.id;`
    )
    res.send(data)
  } catch (err) {
    res.status(404).send(err)
  }
})
app.delete('/records/:id', async (req, res) => {
  const { id } = req.params
  try {
    await conn.query(`DELETE FROM records WHERE id = (?)`, id)
    res.sendStatus(200)
  } catch (err) {
    res.status(404).send(err)
  }
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
