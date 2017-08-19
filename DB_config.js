
var mysql    = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Scut1234',
    database : 'SCUTSecondHand'
});

connection.connect();

module.exports = connection;