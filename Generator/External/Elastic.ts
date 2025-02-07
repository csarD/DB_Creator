import {Client} from '@elastic/elasticsearch'

const client = new Client(
    {
        node: 'http://elasticsearch:9200',
        auth:{
            username:'elastic', password:'<your_password>'
        }
    }
)
client.ping()
    .then(() => console.log('Connected to Elasticsearch'))
    .catch(err => console.error('Failed to connect to Elasticsearch', err));

// Manejar la reconexión
setInterval(async () => {
    try {
        await client.ping();
        console.log('Reconnected to Elasticsearch');
    } catch (err) {
        console.error('Failed to reconnect to Elasticsearch', err);
    }
}, 60000); // Intentar reconectar cada minuto

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


