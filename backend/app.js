const express = require("express")
const bodyParser = require("body-parser")
const res = require("express/lib/response")
const app = express()

const database = require("./database.js")

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000, function () {
  console.log("listening on 3000")
})
app.post("/form", (req, res) => {
  res.send(req.body)
})
app.get("/test", (req, res) => {
  const conn = database.establishConnection().then(conn => {
    console.log("fajnie")
    conn
      .query("INSERT INTO materialy value (?, ?)", [
        null,
        "testowy material szzefie",
      ])
      .then(result => console.log(result))
  })
})
