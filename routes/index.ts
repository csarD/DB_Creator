import { Router,Request} from 'express';
const router = Router();
import db from '../db'
import generator from '../generators'
import {table,data} from '../runners'


router.post('/:limit', async function(req:Request<{ limit: number}>, res, next) {
  try {
    await db('DROP SCHEMA public CASCADE; CREATE SCHEMA public;',[]);
    const limit:number= req.params.limit
    const d= generator.faker(limit);
    console.log(d)
    const tables= Object.keys(d)
    tables.forEach( async (name)=>{
      await table(d[name].table)
      await data(d[name].data,d[name].tablename)
    })

    const result = await db('SELECT NOW()',[]);

    res.type('txt').send({param: limit,time:result.rows[0],data:d});
  } catch (err) {
    next(err);
  }
});


export default router;
