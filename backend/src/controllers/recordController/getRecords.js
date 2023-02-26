import { runDBQuery } from '../../database.js'

export const getRecords = async (req, res) => {
  try {
    const data = await runDBQuery(`SELECT * FROM records;`)
    res.send(data)
  } catch (err) {
    res
      .status(400)
      .send({ message: err.text || 'Nie udało się znaleźć rekordów' })
  }
}
