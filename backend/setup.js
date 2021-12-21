const mariadb = require('mariadb');

mariadb.createConnection({host: 'localhost', user: 'root', password: 'root'})
    .then(conn => {
        conn.query("create or replace database demo;")
            .then(result => {
                console.log(result)
            })
            .catch(err => { 
                // database creation error
                console.log(err)
                conn.end()
            }).then(
                conn.query("use demo;").then(
                conn.query("create or replace table records (id int auto_increment, name varchar(255) not null, primary key(id));")
                    .then(result => {
                        console.log(result)
                        conn.end()
                    })
                    .catch(err => { 
                        // table creation error
                        console.log(err)
                        conn.end()
                    })
            ))
    })
    .catch(err => {
        // connection error
        console.log(err)
        conn.end()
    })