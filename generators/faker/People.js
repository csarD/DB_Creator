const { faker } = require('@faker-js/faker');

const schema= (i)=>{
    faker.seed(i)
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
}


module.exports = {
    people: (limit)=> {
        let people = []
        for(let i = 0; i < limit; i++){
                //faker.seed(i)
            let d= {}
            let keys= Object.keys(schema(i))
            keys.forEach((key)=>{
                d[key]= schema(i)[key]
            })
            people.push(d)
        }
        return people},
    people_table: ()=>{
        let columns= Object.keys(schema(0))
        let script= `CREATE TABLE if not exists people (`
        columns.forEach((column)=>{
            script+= `${column} TEXT,`
        })
        script= script.slice(0,-1)
        script+= `);`
        script+= `truncate table people;`
        return script
    }
}