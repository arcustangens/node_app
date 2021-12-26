import { dbConnection } from '../../../database.js'

export const getDimensionTypes = async (req, res) => {
  try {
    const data = await dbConnection.query('SELECT * FROM typ_wymiaru;')
    const parsedData = data.map(({ id, typ }) => ({
      value: id,
      label: typ,
    }))
    res.send(parsedData)
  } catch (err) {
    res.status(404).send(err)
  }
}
