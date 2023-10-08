import { Client } from '@elastic/elasticsearch';

const client = new Client({
    cloud: { 
        id: //empty
    },
    auth: {
        apiKey: //empty
    }
})
async function run(){
    const document = await client.search({
        index: "nonprofits",
        "query": {
            "bool": {
            "must": [
                { "match": { "employees.TitleTxt": "DIRECTOR" }}
            ]
        }
          }
    })  
   const results = document.hits.hits
    results.forEach((hit) => {
        console.log(hit._source); // this logs the original data of each hit
    });

}
run().catch(console.log)