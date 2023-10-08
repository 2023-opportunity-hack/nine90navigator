<script lang="ts">
	import Nonprofit from '$lib/Nonprofit.svelte';
	import { searchResults } from '../stores';
	import image from '../static/icon.png';
</script>

<div class="flex flex-row">
	<img class="object-contain h-16" src={image} alt="" />
	<h1 class="h1 m-2">
		<span
			class="bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone"
			>Nine-90 Search</span
		>
	</h1>
</div>

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
		<label class="label">
			<span>Minimum annual gross revenue</span>
			<input class="input" type="number" name="grossRevenueMin" placeholder="Min" />
		</label>
		<label class="label">
			<span>Maximum annual gross revenue</span>
			<input class="input" type="number" name="grossRevenueMax" placeholder="Max" />
		</label>
		<label class="label">
			<span>Minimum annual net revenue</span>
			<input class="input" type="number" name="netRevenueMin" placeholder="Min" />
		</label>
		<label class="label">
			<span>Maximum annual net revenue</span>
			<input class="input" type="number" name="netRevenueMax" placeholder="Max" />
		</label>
		<button class="btn variant-filled-primary">Search</button>
	</div>
</form>

<hr class="!border-t-8" />

<ul class="m-2">
	{#each $searchResults as result (result.ein)}
		<Nonprofit
			name={result.name}
			ein={result.ein}
			city={result.city}
			state={result.state}
			returnType={result.returnType}
			obj={result}
		/>
	{/each}
</ul>
