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
	const orQueries = [];

	const partialMatchTerms = ['name', 'ein', 'city', 'state'];
	for (const term of partialMatchTerms) {
		const termValue = url.searchParams.get(term);
		if (termValue?.length !== 0) {
			orQueries.push({ wildcard: { [term]: `*${termValue}*` } });
		}
	}

	const rangeMatchTerms = [
		{ name: 'grossRevenue', min: 'grossRevenueMin', max: 'grossRevenueMax' },
		{ name: 'netRevenue', min: 'netRevenueMin', max: 'netRevenueMax' }
	];
	for (const term of rangeMatchTerms) {
		const termValueMin = url.searchParams.get(term.min);
		const termValueMax = url.searchParams.get(term.max);
		if (termValueMin?.length !== 0 && termValueMax?.length !== 0) {
			orQueries.push({ range: { [term.name]: { gte: termValueMin, lte: termValueMax } } });
		}
	}

	const documents = await client.helpers.search({
		query: {
			bool: {
				must: orQueries
			}
		}
	});

	return new Response(JSON.stringify(documents));
};
