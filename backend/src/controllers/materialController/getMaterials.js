import { runDBQuery } from '../../database.js'

export const getMaterials = async (req, res) => {
  try {
    const data = await runDBQuery('SELECT * FROM materials;')
    const parsedData = data.map(({ id, material }) => ({
      value: id,
      label: material,
    }))
    res.send(parsedData)
  } catch (err) {
    res
      .status(400)
      .send({ message: err.text || 'Nie udało się znaleźć materiałów' })
  }
}
