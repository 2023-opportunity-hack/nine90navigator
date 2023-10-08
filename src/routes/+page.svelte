<script lang="ts">
	import Nonprofit from '$lib/Nonprofit.svelte';
	import { searchResults } from '../stores';
</script>

<h1 class="h1 m-2">Nine-90 Search</h1>

<form class="py-2 m-2" method="POST">
	<div class="flex flex-row">
		<label class="label">
			<span>Nonprofit name</span>
			<input class="input" name="name" placeholder="Kittens & Dogs Ltd." />
		</label>
		<label class="label">
			<span>Employer Identification Number (EIN)</span>
			<input class="input" name="ein" placeholder="000000000" />
		</label>
		<label class="label">
			<span>City</span>
			<input class="input" name="city" placeholder="Glendale" />
		</label>
		<label class="label">
			<span>State</span>
			<input class="input" name="state" placeholder="Arizona" />
		</label>
		<button class="btn variant-filled-primary">Search</button>
	</div>
</form>

<hr class="!border-t-8" />

<ul class="m-2">
	{#each $searchResults as result}
		<Nonprofit name={result.name} ein={result.ein} city={result.city} state={result.state} />
	{/each}
</ul>
