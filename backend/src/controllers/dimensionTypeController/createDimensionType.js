import { dbConnection } from '../../../database.js'

export const createDimensionType = async (req, res) => {
  try {
    const { dimensionType } = req.body

    await dbConnection.query('INSERT INTO dimensionTypes value (?, ?)', [
      null,
      dimensionType,
    ])

    res.sendStatus(200)
  } catch (err) {
    res.status(400).send(err)
  }
}
