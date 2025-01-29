const { faker } = require('@faker-js/faker');

const schema= (i)=>{
    faker.seed(i)
    return{
        id:i,
    name: faker.airline.airport()['name'],
        iata: faker.airline.airport()['iataCode'],
   }
}


module.exports = {
    data: (limit)=> {
        let records = []
        for(let i = 0; i < limit; i++){
                //faker.seed(i)
            let d= {}
            let keys= Object.keys(schema(i))
            keys.forEach((key)=>{
                d[key]= schema(i)[key]
            })
            records.push(d)
        }
        return records},
    table: (tablename)=>{
        let columns= Object.keys(schema(0))
        let script= `CREATE TABLE if not exists ${tablename} (`
        columns.forEach((column)=>{
            script+= `${column} TEXT,`
        })
        script= script.slice(0,-1)
        script+= `);`
        script+= `truncate table ${tablename};`
        return script
    }
}