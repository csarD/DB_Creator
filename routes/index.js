let express = require('express');
let router = express.Router();
let db = require('../db');
let generator = require('../generators');
const {data, table} = require("../runners");


router.get('/:limit', async function(req, res, next) {
  try {
    const limit= req.params.limit
    const d= generator.faker(limit);
    console.log(d)
    const tables= Object.keys(d)
    tables.forEach( async (tablename)=>{
      await table(d[tablename].table)
      await data(d[tablename].data,d[tablename].nametable)
    })

    const result = await db.query('SELECT NOW()');

    res.type('txt').send({param: limit,time:result.rows[0],data:d});
  } catch (err) {
    next(err);
  }
});


module.exports = router;
