import { Client } from '@elastic/elasticsearch';

const client = new Client({
<<<<<<< HEAD
	cloud: {
		id: process.env.ELASTIC_CLOUD_ID
	},
	auth: {
		apiKey: process.env.ELASTIC_CLOUD_API_KEY
	}
=======
    cloud: { 
        id: 
    },
    auth: {
        apiKey: 
    }
>>>>>>> 2812298 (changed ein to a  string)
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
