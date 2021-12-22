const express = require("express")
const bodyParser = require("body-parser")
const res = require("express/lib/response")
const app = express()

const database = require("./database.js")

let conn

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

app.post("/form", (req, res) => {
  console.log(req.body)
  res.send()
})

app.get("/kontrahenci", async (req, res) => {
  conn
    .query("SELECT * FROM kontrahenci;")
    .then(response => {
      res.send(response)
    })
    .catch(err => console.log(err))
})
app.post("/kontrahenci", async (req, res) => {
  conn
    .query("INSERT INTO kontrahenci value (?, ?, ?)", [
      null,
      req.body.kontrahent,
      "TEST",
    ])
    .then(res.send())
    .catch(err => console.log(err))
})

app.get("/materialy", async (req, res) => {
  conn
    .query("SELECT * FROM materialy;")
    .then(response => {
      res.send(response)
    })
    .catch(err => console.log(err))
})
app.post("/materialy", async (req, res) => {
  conn
    .query("INSERT INTO materialy value (?, ?)", [null, req.body.material])
    .then(res.send())
    .catch(err => console.log(err))
})

app.get("/typ_wymiaru", async (req, res) => {
  conn
    .query("SELECT * FROM typ_wymiaru;")
    .then(response => {
      res.send(response)
    })
    .catch(err => console.log(err))
})
app.post("/typ_wymiaru", async (req, res) => {
  conn
    .query("INSERT INTO typ_wymiaru value (?, ?)", [null, req.body.typWymiaru])
    .then(res.send())
    .catch(err => console.log(err))
})

const main = async () => {
  conn = await database.establishConnection()
  app.listen(3000, function () {
    console.log("listening on 3000")
  })
}

main()
