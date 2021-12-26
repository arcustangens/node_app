import { dbConnection } from '../../../database.js'

export const getRecords = async (req, res) => {
  try {
    const data = await dbConnection.query(
      `SELECT r.id, k.kontrahent, r.numer, t.typ, r.a, r.b, r.c, r.d, r.e, r.f, r.nazwa, m.material, r.uwagi, r.plik, r.plik_thumbnail FROM records r
          LEFT JOIN kontrahenci k ON r.id_kontrahenta = k.id
          LEFT JOIN typ_wymiaru t ON r.id_typu_wymiaru = t.id
          LEFT JOIN materialy m ON r.id_materialu = m.id;`
    )
    res.send(data)
  } catch (err) {
    res.status(404).send(err)
  }
}
