import { dbConnection } from '../../../database.js'

export const getContractors = async (req, res) => {
  try {
    const data = await dbConnection.query('SELECT * FROM contractors;')
    const parsedData = data.map(({ id, contractor }) => ({
      value: id,
      label: contractor,
    }))
    res.send(parsedData)
  } catch (err) {
    res
      .status(400)
      .send({ message: err.text || 'Nie udało się znaleźć kontrahentów' })
  }
}
