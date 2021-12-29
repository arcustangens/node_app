import mariadb from 'mariadb'

export let dbConnection

const databaseInit = async (
  host = '127.0.0.1',
  port = '/run/mysqld/mysqld.sock',
  user = 'root',
  password = 'Root12345!'
) => {
  try {
    dbConnection = await mariadb.createConnection({
      user: user,
      host: host,
      port: port,
      password: password,
    })

    // Setup database and tables if they don't exist yet
    // await dbConnection.query('drop database if exists demo;')
    // await dbConnection.query('create database if not exists demo;')
    await dbConnection.query('use demo;')
    // await dbConnection.query(`CREATE TABLE IF NOT EXISTS \`contractors\` (
    //   \`id\` INT NOT NULL AUTO_INCREMENT,
    //   \`contractor\` varchar(255) NOT NULL UNIQUE,
    //   \`acronym\` varchar(255) NOT NULL UNIQUE,
    //   PRIMARY KEY (\`id\`)
    // );`)
    // await dbConnection.query(`CREATE TABLE IF NOT EXISTS \`materials\` (
    //   \`id\` INT NOT NULL AUTO_INCREMENT,
    //   \`material\` varchar(255) NOT NULL UNIQUE,
    //   PRIMARY KEY (\`id\`)
    // );`)
    // await dbConnection.query(`CREATE TABLE IF NOT EXISTS \`dimensionTypes\` (
    //   \`id\` INT NOT NULL AUTO_INCREMENT,
    //   \`dimensionType\` varchar(255) NOT NULL UNIQUE,
    //   PRIMARY KEY (\`id\`)
    // );`)
    // await dbConnection.query(`CREATE TABLE IF NOT EXISTS \`records\` (
    //   \`id\` INT NOT NULL AUTO_INCREMENT,
    //   \`contractorId\` INT NOT NULL,
    //   \`number\` varchar(255) NOT NULL UNIQUE,
    //   \`dimensionTypeId\` INT NOT NULL,
    //   \`a\` FLOAT,
    //   \`b\` FLOAT,
    //   \`c\` FLOAT,
    //   \`d\` FLOAT,
    //   \`e\` FLOAT,
    //   \`f\` FLOAT,
    //   \`name\` varchar(255) NOT NULL UNIQUE,
    //   \`materialId\` INT NOT NULL,
    //   \`comments\` VARCHAR(255) NOT NULL,
    //   \`mainFile\` varchar(255) NOT NULL,
    //   \`thumbnailFile\` varchar(255) NOT NULL,
    //   PRIMARY KEY (\`id\`)
    // );`)
    // await dbConnection.query(
    //   `ALTER TABLE \`records\` ADD CONSTRAINT \`records_fk0\` FOREIGN KEY (\`contractorId\`) REFERENCES \`contractors\`(\`id\`) ;`
    // )
    // await dbConnection.query(
    //   `ALTER TABLE \`records\` ADD CONSTRAINT \`records_fk1\` FOREIGN KEY (\`dimensionTypeId\`) REFERENCES \`dimensionTypes\`(\`id\`);`
    // )
    // await dbConnection.query(
    //   `ALTER TABLE \`records\` ADD CONSTRAINT \`records_fk2\` FOREIGN KEY (\`materialId\`) REFERENCES \`materials\`(\`id\`);`
    // )
  } catch (err) {
    // Manage Errors
    console.log(err)
    if (dbConnection) dbConnection.close()
  }
}

export default databaseInit
