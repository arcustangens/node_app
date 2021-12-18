const http = require("http");

const hostname = "127.0.0.1";
const port = 8000;
let output = "";

const mariadb = require('mariadb/callback');
const conn = mariadb.createConnection({host: 'localhost', port:3306, user:'root', password: 'root', database: 'demo'});
conn.query("SELECT * FROM myTable WHERE val > 0", (err, rows) => {
    output = rows;
});

function databaseToHtml(rows) {
    let output = rows.map(row => {
        result = ""
        Object.keys(row).forEach(key => {
            result += "<th>"
            result += row[key]
            result += "</th>"
        });
        return result;
    }).map(row_html => {
        return "<tr>" + row_html + "</tr>"
    }).reduce((row1, row2) => row1 + row2)
    return "<table>"+output+"</table>";
}

// Create HTTP server
const server = http.createServer((req, res) => {

   // Set the response HTTP header with HTTP status and Content type
   res.writeHead(200, {'Content-Type': 'html'});

   res.end(databaseToHtml(output));
});

// Prints a log once the server starts listening
server.listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`);
})