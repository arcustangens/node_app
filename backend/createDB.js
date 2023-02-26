import mariadb from 'mariadb'
import * as dotenv from 'dotenv'

dotenv.config()

const init = async () => {
  let dbConnection

  try {
    dbConnection = await mariadb.createConnection({
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    })

    await dbConnection.query('DROP demo;')
    await dbConnection.query('CREATE DATABASE IF NOT EXISTS demo;')
    await dbConnection.query('USE demo;')
    await dbConnection.query(`CREATE TABLE IF NOT EXISTS \`contractors\` (
      \`id\` INT NOT NULL AUTO_INCREMENT,
      \`contractor\` varchar(255) NOT NULL UNIQUE,
      \`acronym\` varchar(255) NOT NULL UNIQUE,
      PRIMARY KEY (\`id\`)
    );`)
    await dbConnection.query(`CREATE TABLE IF NOT EXISTS \`materials\` (
      \`id\` INT NOT NULL AUTO_INCREMENT,
      \`material\` varchar(255) NOT NULL UNIQUE,
      PRIMARY KEY (\`id\`)
    );`)
    await dbConnection.query(`CREATE TABLE IF NOT EXISTS \`dimensionTypes\` (
      \`id\` INT NOT NULL AUTO_INCREMENT,
      \`dimensionType\` varchar(255) NOT NULL UNIQUE,
      PRIMARY KEY (\`id\`)
    );`)
    await dbConnection.query(`CREATE TABLE IF NOT EXISTS \`records\` (
      \`id\` INT NOT NULL AUTO_INCREMENT,
      \`contractorId\` INT NOT NULL,
      \`number\` varchar(255) NOT NULL UNIQUE,
      \`dimensionTypeId\` INT NOT NULL,
      \`a\` FLOAT,
      \`b\` FLOAT,
      \`c\` FLOAT,
      \`d\` FLOAT,
      \`e\` FLOAT,
      \`f\` FLOAT,
      \`name\` varchar(255) NOT NULL UNIQUE,
      \`materialId\` INT NOT NULL,
      \`comments\` VARCHAR(255) NOT NULL,
      \`mainFile\` varchar(255) NOT NULL,
      \`thumbnailFile\` varchar(255) NOT NULL,
      PRIMARY KEY (\`id\`)
    );`)
    await dbConnection.query(
      `ALTER TABLE \`records\` ADD CONSTRAINT \`records_fk0\` FOREIGN KEY (\`contractorId\`) REFERENCES \`contractors\`(\`id\`) ;`
    )
    await dbConnection.query(
      `ALTER TABLE \`records\` ADD CONSTRAINT \`records_fk1\` FOREIGN KEY (\`dimensionTypeId\`) REFERENCES \`dimensionTypes\`(\`id\`);`
    )
    await dbConnection.query(
      `ALTER TABLE \`records\` ADD CONSTRAINT \`records_fk2\` FOREIGN KEY (\`materialId\`) REFERENCES \`materials\`(\`id\`);`
    )
  } catch (err) {
    console.log(err)
  } finally {
    dbConnection.end()
  }
}

init()
