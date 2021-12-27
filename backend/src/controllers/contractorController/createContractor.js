import { dbConnection } from '../../../database.js'

export const createContractor = async (req, res) => {
  try {
    const { contractor, acronym } = req.body

    await dbConnection.query('INSERT INTO contractors value (?, ?, ?)', [
      null,
      contractor,
      acronym,
    ])

    res.sendStatus(200)
  } catch (err) {
    res
      .status(400)
      .send({ message: err.text || 'Nie udało się dodać kontrahenta' })
  }
}
