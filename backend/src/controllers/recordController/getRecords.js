import { dbConnection } from '../../../database.js'

export const getRecords = async (req, res) => {
  try {
    const data = await dbConnection.query(`SELECT * FROM records;`)
    res.send(data)
  } catch (err) {
    res.status(404).send(err)
  }
}
