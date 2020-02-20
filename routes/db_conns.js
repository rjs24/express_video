const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.PG_NAME,
    host: process.env.PG_HOST,
    database: 'main',
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});

exports.db_conn = {
    DB_CONNECT: pool
};