const pg = require('pg')

//database connection

if (process.env.DATABASE_URL) {
    const pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false},
});

} else {
    const pool = new pg.Pool({
        database: 'taskapp',
        host: 'localhost',
        port: 5432,
        max: 10,
        idleTimeoutMillis: 30000
});

//using postgres to connect db
pool.on('connect', () => {
    console.log('Postgresql connected');
});

//log backend error or network partition??
pool.on('error', (error) => {
    console.log('Error with postgres pool', error)
 });

 //export pool to be used in router files
module.exports = pool;