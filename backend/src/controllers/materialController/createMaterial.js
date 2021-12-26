import { dbConnection } from '../../../database.js'

export const createMaterial = async (req, res) => {
  try {
    const { material } = req.body

    await dbConnection.query('INSERT INTO materialy value (?, ?)', [
      null,
      material,
    ])

    res.sendStatus(200)
  } catch (err) {
    res.status(400).send(err)
  }
}
