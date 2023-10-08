<script>
	import '../app.css';
</script>

<slot />

<style lang="postcss">
	:global(html) {
		background-color: rgba(var(--color-surface-50));
	}
</style>
