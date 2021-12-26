import mariadb from 'mariadb'

export let dbConnection

const databaseInit = async (
  host = 'localhost',
  port = 3306,
  user = 'root',
  password = 'root'
) => {
  try {
    dbConnection = await mariadb.createConnection({
      user: user,
      host: host,
      port: port,
      password: password,
    })

    // Setup database and tables if they don't exist yet
    // await conn.query('drop database if exists demo;')
    await dbConnection.query('create database if not exists demo;')
    await dbConnection.query('use demo;')
    // await conn.query(`CREATE TABLE IF NOT EXISTS \`kontrahenci\` (
    //   \`id\` INT NOT NULL AUTO_INCREMENT,
    //   \`kontrahent\` varchar(255) NOT NULL,
    //   \`akronim\` varchar(255) NOT NULL,
    //   PRIMARY KEY (\`id\`)
    // );`)
    // await conn.query(`CREATE TABLE IF NOT EXISTS \`materialy\` (
    //   \`id\` INT NOT NULL AUTO_INCREMENT,
    //   \`material\` varchar(255) NOT NULL,
    //   PRIMARY KEY (\`id\`)
    // );`)
    // await conn.query(`CREATE TABLE IF NOT EXISTS \`typ_wymiaru\` (
    //   \`id\` INT NOT NULL AUTO_INCREMENT,
    //   \`typ\` varchar(255) NOT NULL,
    //   PRIMARY KEY (\`id\`)
    // );`)
    // await conn.query(`CREATE TABLE IF NOT EXISTS \`records\` (
    //   \`id\` INT NOT NULL AUTO_INCREMENT,
    //   \`id_kontrahenta\` INT NOT NULL,
    //   \`numer\` varchar(255) NOT NULL,
    //   \`id_typu_wymiaru\` INT NOT NULL,
    //   \`a\` FLOAT,
    //   \`b\` FLOAT,
    //   \`c\` FLOAT,
    //   \`d\` FLOAT,
    //   \`e\` FLOAT,
    //   \`f\` FLOAT,
    //   \`nazwa\` varchar(255) NOT NULL,
    //   \`id_materialu\` INT NOT NULL,
    //   \`uwagi\` VARCHAR(255) NOT NULL,
    //   \`plik\` varchar(255) NOT NULL,
    //   \`plik_thumbnail\` varchar(255) NOT NULL,
    //   PRIMARY KEY (\`id\`)
    // );`)
    // await conn.query(
    //   `ALTER TABLE  \`records\` ADD CONSTRAINT \`records_fk0\` FOREIGN KEY (\`id_kontrahenta\`) REFERENCES \`kontrahenci\`(\`id\`) ;`
    // )
    // await conn.query(
    //   `ALTER TABLE \`records\` ADD CONSTRAINT \`records_fk1\` FOREIGN KEY (\`id_typu_wymiaru\`) REFERENCES \`typ_wymiaru\`(\`id\`);`
    // )
    // await conn.query(
    //   `ALTER TABLE \`records\` ADD CONSTRAINT \`records_fk2\` FOREIGN KEY (\`id_materialu\`) REFERENCES \`materialy\`(\`id\`);`
    // )
  } catch (err) {
    // Manage Errors
    console.log(err)
    if (dbConnection) dbConnection.close()
  }
}

export default databaseInit
