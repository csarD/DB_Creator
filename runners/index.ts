import db from '../db'


const data = async (data: any[], table: string) => {
    if (data.length === 0) return;

    const columns = Object.keys(data[0]);
    const values = data.map(row => {
        return `(${columns.map(column => {
            if (column !== 'id') {
                return `'${row[column].replaceAll("'", "\"")}'`;
            } else {
                return `${row[column]}`;
            }
        }).join(',')})`;
                }).join(',\n');

    const script = `INSERT INTO ${table} (${columns.join(',')}) VALUES ${values};`;
    console.log(script);
    await db(script, []);
};

    const table=async(script)=> {
        if (script !== 'undefined') {
            await db(script,[])
        }
    }
export {data,table}