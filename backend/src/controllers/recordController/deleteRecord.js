import { dbConnection } from '../../../database.js'

export const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params
    await dbConnection.query(`DELETE FROM records WHERE id = (?)`, id)
    res.sendStatus(200)
  } catch (err) {
    res
      .status(400)
      .send({ message: err.text || 'Nie udało się usunąć rekordu' })
  }
}
