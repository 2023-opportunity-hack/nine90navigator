<script lang="ts">
	export let name = 'No name';
	export let ein = 'No EIN';
	export let city = 'No city';
	export let state = 'No state';
</script>

<div class="card">
	<header class="card-header">{name} ({ein})</header>
	<section class="p-4">{city}, {state}</section>
	<!-- <footer class="card-footer">Footer</footer> -->
</div>
