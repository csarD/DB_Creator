let db = require('../db');
module.exports = {
    data:async(data,table)=>{
        let script= `INSERT INTO ${table} (`
        let columns= Object.keys(data[0])
        columns.forEach((column)=>{
            script+= `${column},`
        })
        script= script.slice(0,-1)
        script+= `) VALUES `
        data.forEach((row)=>{

            script+= `('`
            columns.forEach((column)=>{
                if(column!=='id'){
                    script+= `${row[column].replaceAll('\'','"')}','`
                }else{
                    script+= `${row[column]}','`
                }

            })
            script= script.slice(0,-2)
            script+= `),`
        })
        script= script.slice(0,-1)
        script+= `;`
       await db.query(script)
    },
    table:async(script)=> {
        if (script !== 'undefined') {
            await db.query(script)
        }
    }
}