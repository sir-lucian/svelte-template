<script>
	import MenuBar from '$lib/components/common/MenuBar.svelte';
	let { children } = $props();
</script>

<MenuBar />
{@render children()}
<footer class="text-gray-700 text-sm px-2 py-5 text-center">
    <p>&copy; 2025-{new Date().getFullYear()} Your Company Co.,Ltd</p>
</footer>