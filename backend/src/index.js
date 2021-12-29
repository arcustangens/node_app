import express from 'express'
import bodyParser from 'body-parser'
import records from './routes/records.js'
import contractors from './routes/contractors.js'
import dimensionTypes from './routes/dimensionTypes.js'
import materials from './routes/materials.js'
import databaseInit from '../database.js'
import path from 'path'

const app = express()
const __dirname = path.resolve()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

app.use('/uploads', express.static('uploads'))
app.use(express.static(path.join(__dirname, '../frontend/build')))

app.use('/api/records', records)
app.use('/api/contractors', contractors)
app.use('/api/dimensionTypes', dimensionTypes)
app.use('/api/materials', materials)

app.get(/^\/((?!(api|uploads)).*)$/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'))
})

const main = async () => {
  await databaseInit()
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
}

main()
