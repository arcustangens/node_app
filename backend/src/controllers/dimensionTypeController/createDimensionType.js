import { dbConnection } from '../../../database.js'

export const createDimensionType = async (req, res) => {
  try {
    const { typWymiaru } = req.body

    await dbConnection.query('INSERT INTO typ_wymiaru value (?, ?)', [
      null,
      typWymiaru,
    ])

    res.sendStatus(200)
  } catch (err) {
    res.status(400).send(err)
  }
}
