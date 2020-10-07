/*                db.js -- Database object configuration                  */
/*           verbose = long stack traces, for development only            */

var sqlite3 = require('sqlite3').verbose();

//var db = new sqlite3.Database('./database/db.sqlite');
var db = new sqlite3.Database('./database/test54.db');

module.exports = db;
