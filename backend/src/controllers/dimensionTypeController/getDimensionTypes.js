import { dbConnection } from '../../../database.js'

export const getDimensionTypes = async (req, res) => {
  try {
    const data = await dbConnection.query('SELECT * FROM dimensionTypes;')
    const parsedData = data.map(({ id, dimensionType }) => ({
      value: id,
      label: dimensionType,
    }))
    res.send(parsedData)
  } catch (err) {
    res.status(404).send(err)
  }
}
