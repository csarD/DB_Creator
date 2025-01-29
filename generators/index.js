const { people, people_table} = require('./faker/People');

const {data, table} = require("./faker/General");

module.exports={
    faker:(limit)=>{
        let nametables=['people','airport']
        let toReturn={}
        nametables.forEach(name=>{
            toReturn[name]=data(limit,name)
        })


        return toReturn
    }
}
