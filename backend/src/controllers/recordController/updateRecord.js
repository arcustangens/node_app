import { dbConnection } from '../../../database.js'

export const updateRecord = async (req, res) => {
  try {
    const { id } = req.params

    const existingRecord = await dbConnection.query(
      'SELECT id, mainFile, thumbnailFile FROM records WHERE id = ?',
      id
    )

    if (!existingRecord[0]) {
      res.status(404).send({ message: 'Nie znaleziono rekordu' })
    } else {
      const { mainFile, thumbnailFile } = req.files
      const {
        contractor,
        number,
        dimensionType,
        a,
        b,
        c,
        d,
        e,
        f,
        name,
        material,
        comments,
      } = req.body

      const parsedA = parseFloat(a) || null
      const parsedB = parseFloat(b) || null
      const parsedC = parseFloat(c) || null
      const parsedD = parseFloat(d) || null
      const parsedE = parseFloat(e) || null
      const parsedF = parseFloat(f) || null
      const parsedComments = String(comments || '')

      await dbConnection.query(
        `UPDATE records SET contractorId = ?, number = ?, dimensionTypeId = ?, a = ?, b = ?, c = ?, d = ?,
        e = ?, f = ?, name = ?, materialId = ?, comments = ?, mainFile = ?, thumbnailFile = ? WHERE id = ?`,
        [
          contractor,
          number,
          dimensionType,
          parsedA,
          parsedB,
          parsedC,
          parsedD,
          parsedE,
          parsedF,
          name,
          material,
          parsedComments,
          mainFile ? mainFile[0].filename : existingRecord[0].mainFile,
          thumbnailFile
            ? thumbnailFile[0].filename
            : existingRecord[0].thumbnailFile,
          id,
        ]
      )

      res.sendStatus(200)
    }
  } catch (err) {
    res
      .status(400)
      .send({ message: err.text || 'Nie udało się zaktualizować rekordu' })
  }
}
