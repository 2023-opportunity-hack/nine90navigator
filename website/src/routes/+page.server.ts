import type { Actions } from './$types';
import { searchResults } from '../stores';

export const actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();
		const params = new URLSearchParams();
		data.forEach((v, k) => params.set(k.toString(), v.toString()));
		const res = await fetch(`/search?${params.toString()}`).then((x) => x.json());
		searchResults.set(res);
		return { success: true };
	}
} satisfies Actions;
