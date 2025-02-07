import {faker} from "@faker-js/faker";
import validate from "./ValidateType";
const schema= (i,table)=>{
    faker.seed(i)
    switch (table){
        case 'people':
            return{
                id:i,
                name: faker.person.fullName(),
                gender: faker.person.sex(),
                email: faker.internet.email(),
                phone: faker.phone.number({style:'national'}),
                city: faker.location.city(),
                state: faker.location.state(),
                zip: faker.location.zipCode(),
                country: faker.location.country(),
                avatar: faker.image.avatar()}
        case 'airport':
            return{
                id:i,
                name: faker.airline.airport()['name'],
                iata: faker.airline.airport()['iataCode'],
            }
        case 'airline':
            return{
                id:i,
                name: faker.airline.airline()['name'],
                iata: faker.airline.airline()['iataCode'],
            }
            case 'airplane':
            return{
                id:i,
                type: faker.airline.aircraftType(),
                name: faker.airline.airplane()['name'],
                iata: faker.airline.airplane()['iataTypeCode'],
                color: faker.color.rgb()
    }
        case 'seat':
            return{
                id:i,
                seat: faker.airline.seat(),
                price: faker.commerce.price(),

            }

}}


const tableCreate = (tablename, data) => {
    let types = validate(data);
    console.log(types);
    let columns = Object.keys(schema(0, tablename));
    let script = `CREATE TABLE if not exists ${tablename} (`;
    columns.forEach((column) => {
        script += `${column} ${types[column]},`;
    });
    script = script.slice(0, -1);
    script += `);`;
    script += `truncate table ${tablename};`;
    return script;
};


    const data= (limit,tablename)=> {
        let data = []
        for(let i = 0; i < limit; i++){
            let d= {}
            let keys= Object.keys(schema(i,tablename))
            keys.forEach((key)=>{
                d[key]= schema(i,tablename)[key]
            })
            data.push(d)
        }

        return {
            data:data,
            tablename:tablename,
            table: tableCreate(tablename,data)
        }}

export default data