import { Client } from '@elastic/elasticsearch';
import { ELASTIC_CLOUD_API_KEY, ELASTIC_CLOUD_ID } from '$env/static/private';
import type { RequestHandler } from './$types';

const client = new Client({
	cloud: {
		id: ELASTIC_CLOUD_ID
	},
	auth: {
		apiKey: ELASTIC_CLOUD_API_KEY
	}
});

export const GET: RequestHandler = async function ({ url }) {
	const ein = url.searchParams.get('ein').toString();

	const documents = await client.helpers.search({
		index: 'nonprofits',
		query: {
			regexp: { ein: `.*${ein}.*` }
		}
	});

	return new Response(JSON.stringify(documents));
};
