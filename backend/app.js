const express = require("express")
const bodyParser = require("body-parser")
const res = require("express/lib/response")
const app = express()

const database = require("./database.js")

let conn

app.use(bodyParser.urlencoded({ extended: true }))

app.post("/form", (req, res) => {
  console.log(req.body)
  res.send()
})
app.get("/kontrahenci", async (req, res) => {
  conn
    .query("SELECT * FROM kontrahenci;")
    .then(response => {
      console.log(response)
      res.send(response)
    })
    .catch(err => console.log(err))
})
app.post("/kontrahenci", async (req, res) => {
  console.log(req.body)
  res.send()
})
app.get("/materialy", async (req, res) => {
  conn
    .query("SELECT * FROM materialy;")
    .then(response => {
      console.log(response)
      res.send(response)
    })
    .catch(err => console.log(err))
})
app.post("/materialy", async (req, res) => {
  console.log(req.body)
  res.send()
})

const main = async () => {
  conn = await database.establishConnection()
  app.listen(3000, function () {
    console.log("listening on 3000")
  })
}

main()
