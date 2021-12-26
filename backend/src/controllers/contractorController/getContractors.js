import { dbConnection } from '../../../database.js'

export const getContractors = async (req, res) => {
  try {
    const data = await dbConnection.query('SELECT * FROM kontrahenci;')
    const parsedData = data.map(({ id, kontrahent }) => ({
      value: id,
      label: kontrahent,
    }))
    res.send(parsedData)
  } catch (err) {
    res.status(404).send(err)
  }
}
