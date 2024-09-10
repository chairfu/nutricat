const Pool = require('pg').Pool;

const pool = new Pool({

    user: "postgres",
    host: "localhost",
    database: "nutricat",
    password: "passwordHand67",
    port: 5432,

});

module.exports = pool;