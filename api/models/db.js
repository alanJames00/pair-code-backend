const { Client } = require('pg');
require('dotenv').config({ path: '../../.env'})

const db = new Client({

    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

db.connect()
    .then(() => console.log('Connected to db'))
        .catch((e) => console.log(e));