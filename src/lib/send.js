import { Client } from '@elastic/elasticsearch';

const client = new Client({
	cloud: {
		id: '8ee4a8695aad47549647f9b6230f82bf:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyQyMWIwZmU5NjdkYWE0MjM1OGFlMDlkNzMxODNkY2NiZCRkNjBhOTJiMDVkZjI0ZTkzYTBjYjViOTRiZTJjZDliYg=='
	},
	auth: {
		apiKey: 'aFJkekQ0c0JJWkpyU20wT3h4bzY6Qk1HNDY3WlVUejZ0TDR6NjNzaXA0QQ=='
	}
})
export default async function send(objects) {
    await client.indices.create({
            index: "nonprofits",
            operations: {
                mappings: {
                    properties: {
                        ein: { type: "text" },
                        returnType: { type: "text" },
                        city: { type: "text" },
                        state: { type: "text" },
                        grossRevenue: { type: "integer" },
                        netRevenue: { type: "integer" },
                        //Can't get employees to save the information into
                        employees: {type: "object", dynamic: true,properties:{TitleTxt: {type: "text"},}}
                    }
                }
            }
        }, { ignore: [400] })

    const operations = objects.flatMap(obj => [{ index: { _index: "nonprofits" } }, obj])

    const bulkResponse = await client.bulk({ refresh: true, operations })

    if (bulkResponse.errors) {
        const erroredDocuments = []
        // The items array has the same order of the dataset we just indexed.
        // The presence of the `error` key indicates that the operation
        // that we did for the document has failed.
        bulkResponse.items.forEach((action, i) => {
            const operation = Object.keys(action)[0]
            if (action[operation].error) {
                erroredDocuments.push({
                    // If the status is 429 it means that you can retry the document,
                    // otherwise it's very likely a mapping error, and you should
                    // fix the document before to try it again.
                    status: action[operation].status,
                    error: action[operation].error,
                    operation: operations[i * 2],
                    document: operations[i * 2 + 1]
                })
            }
        })
        console.log(erroredDocuments)
    }

    const count = await client.count({ index: 'nonprofits' });
    console.log(`Added ${count} nonprofits to database.`);
}
