import { dbConnection } from '../../../database.js'

export const createContractor = async (req, res) => {
  try {
    const { kontrahent, akronim } = req.body

    await dbConnection.query('INSERT INTO kontrahenci value (?, ?, ?)', [
      null,
      kontrahent,
      akronim,
    ])

    res.sendStatus(200)
  } catch (err) {
    res.status(400).send(err)
  }
}
