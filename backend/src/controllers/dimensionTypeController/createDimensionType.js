import { runDBQuery } from '../../database.js'

export const createDimensionType = async (req, res) => {
  try {
    const { dimensionType } = req.body

    await runDBQuery('INSERT INTO dimensionTypes value (?, ?);', [
      null,
      dimensionType,
    ])

    res.sendStatus(200)
  } catch (err) {
    res
      .status(400)
      .send({ message: err.text || 'Nie udało się dodać typu wymiaru' })
  }
}
