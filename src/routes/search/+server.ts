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
	const partialMatchTerms = ['name', 'ein', 'city', 'state'];
	const partialMatchQueries = [];

	for (const term of partialMatchTerms) {
		const termValue = url.searchParams.get(term);
		console.log(termValue);
		if (termValue !== null && termValue.length !== 0) {
			partialMatchQueries.push({ wildcard: { [term]: `*${termValue}*` } });
		}
	}

	const documents = await client.helpers.search({
		query: {
			bool: {
				must: partialMatchQueries
			}
		}
	});

	return new Response(JSON.stringify(documents));
};
