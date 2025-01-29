const { people, people_table} = require('./faker/People');
const {data, table} = require('./faker/airport');

module.exports={
    faker:(limit)=>{
        return {people:{
                data: people(limit),table: people_table(),nametable: 'people'
            },
        airport:{
            data: data(limit),table: table(),nametable: 'airport'
        }}
    }
}
