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
	const dynamicQuery = [];
	const ein = url.searchParams.get('ein');
	if (ein.length !== 0) {
		dynamicQuery.push({ wildcard: { ein: `*${ein}*` } });
	}
	const city = url.searchParams.get('city');
	if (city.length !== 0) {
		dynamicQuery.push({ wildcard: { city: `*${city}*` } });
	}
	const state = url.searchParams.get('state');
	if (state.length !== 0) {
		dynamicQuery.push({ wildcard: { state: `*${state}*` } });
	}
	const documents = await client.helpers.search({
		query: {
			bool: {
				must: dynamicQuery
			}
		}
	});

	return new Response(JSON.stringify(documents));
};
