const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
    console.log('Connected to the database');
});

module.exports = {
    query: (text, params) => {

        return pool.query(text, params)}
};