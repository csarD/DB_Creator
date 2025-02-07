
import data from './faker/General'

const generator ={
    faker:(limit:number)=>{
        let nametables=['people','airport','airline','airplane','seat']
        let toReturn={}
        nametables.forEach(name=>{
            toReturn[name]=data(limit,name)
        })


        return toReturn
    }
}

export default generator