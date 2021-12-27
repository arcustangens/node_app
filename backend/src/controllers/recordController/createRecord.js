import { dbConnection } from '../../../database.js'

export const createRecord = async (req, res) => {
  try {
    const { mainFile, thumbnailFile } = req.files
    const {
      contractor,
      number,
      dimensionType,
      a,
      b,
      c,
      d,
      e,
      f,
      name,
      material,
      comments,
    } = req.body

    const parsedA = parseFloat(a) || null
    const parsedB = parseFloat(b) || null
    const parsedC = parseFloat(c) || null
    const parsedD = parseFloat(d) || null
    const parsedE = parseFloat(e) || null
    const parsedF = parseFloat(f) || null
    const parsedComments = String(comments || '')

    await dbConnection.query(
      'INSERT INTO records value (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id',
      [
        null,
        contractor,
        number,
        dimensionType,
        parsedA,
        parsedB,
        parsedC,
        parsedD,
        parsedE,
        parsedF,
        name,
        material,
        parsedComments,
        mainFile[0].filename,
        thumbnailFile[0].filename,
      ]
    )

    res.sendStatus(200)
  } catch (err) {
    res.status(400).send({ message: err.text || 'Nie udało się dodać rekordu' })
  }
}
