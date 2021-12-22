const mariadb = require("mariadb")

async function establishConnection(
  host = "localhost",
  port = 3306,
  user = "root",
  password = "root"
) {
  let conn

  try {
    conn = await mariadb.createConnection({
      user: user,
      host: host,
      port: port,
      password: password,
    })

    // Setup database and tables if they don't exist yet
    await conn.query("create database if not exists demo;")
    await conn.query("use demo;")
    await conn.query(
      "CREATE TABLE IF NOT EXISTS `records` ( `id` int(11) NOT NULL AUTO_INCREMENT, `id_kontrahenta` int DEFAULT NULL, `numer` varchar(255) DEFAULT NULL, `id_typu_wymiaru` int DEFAULT NULL, `a` int(11) DEFAULT NULL, `b` int(11) DEFAULT NULL, `c` int(11) DEFAULT NULL, `d` int(11) DEFAULT NULL, `e` int(11) DEFAULT NULL, `f` int(11) DEFAULT NULL, `nazwa` varchar(255) DEFAULT NULL, `id_materialu` varchar(255) DEFAULT NULL, `uwagi` varchar(255) DEFAULT NULL, PRIMARY KEY (`id`) )"
    )
    await conn.query(
      "CREATE TABLE IF NOT EXISTS `kontrahenci` ( `id` int(11) NOT NULL AUTO_INCREMENT, `kontrahent` varchar(255) DEFAULT NULL, `akronim` varchar(255) DEFAULT NULL, PRIMARY KEY (`id`) )"
    )
    await conn.query(
      "CREATE TABLE IF NOT EXISTS `materialy` ( `id` int(11) NOT NULL AUTO_INCREMENT, `material` varchar(255) DEFAULT NULL, PRIMARY KEY (`id`) )"
    )
    await conn.query(
      "CREATE TABLE IF NOT EXISTS `typ_wymiaru` ( `id` int(11) NOT NULL AUTO_INCREMENT, `typ` varchar(255) DEFAULT NULL, PRIMARY KEY (`id`) )"
    )

    return conn
  } catch (err) {
    // Manage Errors
    console.log(err)
    if (conn) conn.close()
  }
}

exports.establishConnection = establishConnection
