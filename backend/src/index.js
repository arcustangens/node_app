import express from 'express'
import bodyParser from 'body-parser'
import multer from 'multer'
import records from './routes/records.js'
import contractors from './routes/contractors.js'
import dimensionTypes from './routes/dimensionTypes.js'
import materials from './routes/materials.js'
import databaseInit, { dbConnection as conn } from '../database.js'

const app = express()

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

app.use('/records', records)
app.use('/contractors', contractors)
app.use('/dimensionTypes', dimensionTypes)
app.use('/materials', materials)

const fillNumberString = (number) => {
  return `${'0'.repeat(3 - number.toString().length)}${number}`
}

app.get('/kontrahenci/next', async (req, res) => {
  try {
    const { idKontrahenta } = req.query
    const kontrahenciData = await conn.query(
      'SELECT akronim FROM kontrahenci WHERE id = (?);',
      idKontrahenta
    )
    const akronim = kontrahenciData[0].akronim
    const recordsData = await conn.query(
      'SELECT numer FROM records WHERE id_kontrahenta = (?);',
      idKontrahenta
    )
    const suggestion = `${akronim}${fillNumberString(recordsData?.length + 1)}`
    res.send({ numerSuggestion: suggestion })
  } catch (err) {
    res.status(404).send(err)
  }
})

const main = async () => {
  await databaseInit()
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
}

main()
