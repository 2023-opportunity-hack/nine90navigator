<script lang="ts">
	export let dat: Object;
</script>

<div class="card">
	<header class="card-header">{dat.ein}</header>
	<section class="p-4">{dat.city}, {dat.state}: Blah blah</section>
	<footer class="card-footer">{dat.ein}</footer>
</div>
