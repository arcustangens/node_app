import { dbConnection } from '../../../database.js'

const fillNumberString = (number) => {
  return `${'0'.repeat(3 - String(number).length)}${number}`
}

export const getNextNumberSuggestion = async (req, res) => {
  try {
    const { contractorId } = req.query

    const contractorsData = await dbConnection.query(
      'SELECT acronym FROM contractors WHERE id = (?);',
      contractorId
    )
    const acronym = contractorsData[0] && contractorsData[0].acronym
    const recordsData = await dbConnection.query(
      'SELECT number FROM records WHERE contractorId = (?);',
      contractorId
    )
    const suggestion = `${acronym}${fillNumberString(recordsData.length + 1)}`
    res.send({ numberSuggestion: suggestion })
  } catch (err) {
    res
      .status(400)
      .send({ message: err.text || 'Nie udało się znaleźć sugestii' })
  }
}
