const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max:100
});

pool.on('connect', () => {
    console.log('Connected to the database');
});





    const query= (text: string, params: any[]) => {

        return pool.query(text, params)}

export default query

