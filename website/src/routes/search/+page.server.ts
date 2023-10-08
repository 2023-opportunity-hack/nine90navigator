import type { Actions } from './$types';
import { Client } from '@elastic/elasticsearch';

const client = new Client({
	cloud: {
		// id: process.env.ELASTIC_CLOUD_ID
		id: '8ee4a8695aad47549647f9b6230f82bf:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyQyMWIwZmU5NjdkYWE0MjM1OGFlMDlkNzMxODNkY2NiZCRkNjBhOTJiMDVkZjI0ZTkzYTBjYjViOTRiZTJjZDliYg=='
	},
	auth: {
		// apiKey: process.env.ELASTIC_CLOUD_API_KEY
		apiKey: '=='
	}
});

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const ein = data.get('ein').toString();

		const documents = await client.helpers.search({
			index: 'nonprofits',
			query: {
				regexp: { ein: `.*${ein}.*` }
			}
		});

		for (const doc of documents) {
			console.log(doc);
		}
	}
} satisfies Actions;
