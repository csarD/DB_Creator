import {Client} from '@elastic/elasticsearch'

const client = new Client(
    {
        node: 'http://localhost:9200',
        auth:{
            username:'elastic', password:'<your_password>'
        }
    }
)
    export const save =async (index:string,data:Object)=>{

        try {
            const response = await client.index({
                index,

                body: {...data,time:new Date()}
            });
            console.log('Document inserted:', response);
        } catch (error) {
            console.error('Error inserting document:', error);
        }
    }



    export const query= (text: string, params: any[]) => {

        return ""
    }


