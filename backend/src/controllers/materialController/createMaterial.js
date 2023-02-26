import { runDBQuery } from '../../database.js'

export const createMaterial = async (req, res) => {
  try {
    const { material } = req.body

    await runDBQuery('INSERT INTO materials value (?, ?);', [null, material])

    res.sendStatus(200)
  } catch (err) {
    res
      .status(400)
      .send({ message: err.text || 'Nie udało się dodać materiału' })
  }
}
