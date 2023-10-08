<script lang="ts">
	import Nonprofit from '$lib/Nonprofit.svelte';
	import { searchResults } from '../stores';
</script>

<form method="POST">
	<label>
		Employer Identification Number (EIN)
		<input name="ein" />
	</label>
	<label>
		City
		<input name="city" />
	</label>
	<label>
		State
		<input name="state" />
	</label>
	<button>Search</button>
</form>

<ul>
	{#each $searchResults as result}
		<Nonprofit dat={result} />
	{/each}
</ul>
