const express = require("express")
const bodyParser = require("body-parser")
const res = require("express/lib/response")
const app = express()

const database = require("./database.js")

let conn

app.use(bodyParser.urlencoded({ extended: true }))

app.post("/form", (req, res) => {
  res.send(req.body)
})
app.get("/test", async (req, res) => {
  const response = await conn.query("INSERT INTO materialy value (?, ?)", [
    null,
    "testowy material szzefie",
  ])
  console.log(response)
})

const main = async () => {
  conn = await database.establishConnection()
  app.listen(3000, function () {
    console.log("listening on 3000")
  })
}

main()
