const mysql = require('mysql')

const herokuDB = {
  user: 'b558bcccc8e41b',
  password:'adc4a96b',
  host: 'us-cdbr-iron-east-05.cleardb.net',
  database: 'heroku_4c0523db0ad7e12'
}

const localDB = {
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: "",
  database: "assassins"
}

const db_config = process.env.CLEARDB_DATABASE_URL ? herokuDB : localDB;
var connection;

function handleDisconnect() {
    console.log('1. connecting to db:');
    connection = mysql.createConnection(db_config); // Recreate the connection, since
													// the old one cannot be reused.

    connection.connect(function(err) {              	// The server is either down
        if (err) {                                     // or restarting (takes a while sometimes).
            console.log('2. error when connecting to db:', err);
            setTimeout(handleDisconnect, 1000); // We introduce a delay before attempting to reconnect,
        }                                     	// to avoid a hot loop, and to allow our node script to
    });                                     	// process asynchronous requests in the meantime.
    											// If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
        console.log('3. db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { 	// Connection to the MySQL server is usually
            handleDisconnect();                      	// lost due to either server restart, or a
        } else {                                      	// connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

handleDisconnect()

class DBFunk{
  constructor(){
    this.connection = connection;
  }

  connectToDB(req, res, next){
    req.query = this.connection.query.bind(this.connection)
    next()
  }
}
module.exports = DBFunk
