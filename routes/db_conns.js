//postgresql connection
const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.PG_NAME,
    host: process.env.PG_HOST,
    database: 'node',
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});


//mongodb connection
const mongo = require('mongodb').MongoClient;
const mongo_url =`mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/?authSource=admin&authMechanism=SCRAM-SHA-256`
const db = process.env.MONGODB_DB;
const mg_conn = (async function mongo_connector() {
    let client;
    try {
        client = await mongo.connect(mongo_url);
        console.log("Db connected!");
        const active_db = client.db(db);
        return active_db;
    } catch (error) {
        console.log("MONGODB ERROR ON CONNECT", error);
    }
}());

exports.db_conn = {
    DB_CONNECT: pool,
    MG_CONNECT: mg_conn
};