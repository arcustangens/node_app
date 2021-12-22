const express = require('express')
const bodyParser = require('body-parser')
const res = require('express/lib/response')
const multer = require('multer')

const upload = multer()
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(upload.array())
app.use(express.static('public'))

app.listen(3000, function () {
  console.log('listening on 3000')
})
app.post('/records', (req, res) => {
  console.log(req.body.email)
  res.send(req.body)
})
