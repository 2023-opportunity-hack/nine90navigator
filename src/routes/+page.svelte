<script lang="ts">
	import { searchResults } from '../stores';
</script>

<form method="POST">
	<label>
		EIN
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
		<li>{result.city}</li>
	{/each}
</ul>
