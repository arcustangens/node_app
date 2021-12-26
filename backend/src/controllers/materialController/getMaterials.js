import { dbConnection } from '../../../database.js'

export const getMaterials = async (req, res) => {
  try {
    const data = await dbConnection.query('SELECT * FROM materials;')
    const parsedData = data.map(({ id, material }) => ({
      value: id,
      label: material,
    }))
    res.send(parsedData)
  } catch (err) {
    res.status(404).send(err)
  }
}
