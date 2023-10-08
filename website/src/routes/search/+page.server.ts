import { Client } from '@elastic/elasticsearch';
import { ELASTIC_CLOUD_API_KEY, ELASTIC_CLOUD_ID } from '$env/static/private';
import type { Actions } from './$types';

const client = new Client({
	cloud: {
		id: ELASTIC_CLOUD_ID
	},
	auth: {
		apiKey: ELASTIC_CLOUD_API_KEY
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
