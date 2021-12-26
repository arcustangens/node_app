import express from 'express'
import bodyParser from 'body-parser'
import records from './routes/records.js'
import contractors from './routes/contractors.js'
import dimensionTypes from './routes/dimensionTypes.js'
import materials from './routes/materials.js'
import databaseInit from '../database.js'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

app.use('/uploads', express.static('uploads'))

app.use('/records', records)
app.use('/contractors', contractors)
app.use('/dimensionTypes', dimensionTypes)
app.use('/materials', materials)

const main = async () => {
  await databaseInit()
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
}

main()
