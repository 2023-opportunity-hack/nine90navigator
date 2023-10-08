<script lang="ts">
	export let name = 'NO NAME';
	export let ein = 'NO EIN';
	export let city = 'NO CITY';
	export let state = 'NO STATE';
	export let returnType = 'NO FORM TYPE';
	export let obj;
</script>

<div class="card">
	<header class="h3 card-header">
		{name}
		<span class="badge variant-filled">EIN: {ein}</span>
		<span class="badge variant-filled">Form type: {returnType}</span>
	</header>
	<section class="p-4">
		Location: {city}, {state} <br />
		Gross revenue: ${obj.grossRevenue} <br />
		Net revenue: ${obj.netRevenue}
	</section>
	<!-- <footer class="card-footer">Footer</footer> -->
</div>
