import mariadb from 'mariadb'

export const runDBQuery = async (query, params) => {
  const connection = await mariadb.createConnection({
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })

  const res = await connection.query(query, params)

  await connection.end()

  return res
}
