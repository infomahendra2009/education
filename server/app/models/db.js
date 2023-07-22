var mysql = require("mysql"); 
const config = require('./../config/db.config');

var connection = mysql.createPool(config);

connection.getConnection(function (err, con) {
    if (err) {
      console.error('Error connecting: ' + err.stack);
      return;
    } else {
      console.log('Connected as id ' + con.threadId, con.state);
    }
  })
module.exports = connection;