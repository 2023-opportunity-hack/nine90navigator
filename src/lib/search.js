import { Client } from '@elastic/elasticsearch';

const client = new Client({
	cloud: {
		id: '8ee4a8695aad47549647f9b6230f82bf:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyQyMWIwZmU5NjdkYWE0MjM1OGFlMDlkNzMxODNkY2NiZCRkNjBhOTJiMDVkZjI0ZTkzYTBjYjViOTRiZTJjZDliYg=='
	},
	auth: {
		apiKey: 'aFJkekQ0c0JJWkpyU20wT3h4bzY6Qk1HNDY3WlVUejZ0TDR6NjNzaXA0QQ=='
	}
})
async function run(){
    const document = await client.search({
        index: "nonprofits",
        "query": {
            "bool": {
                "must": [
                    { "match": { "employees.TitleTxt": "DIRECTOR" }},
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
