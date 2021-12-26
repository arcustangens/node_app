import { dbConnection } from '../../../database.js'

export const createRecord = async (req, res) => {
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

    const queryRes = await dbConnection.query(
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
