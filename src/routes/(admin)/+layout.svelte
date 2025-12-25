<script>

    import Header from '$lib/components/Header.svelte';
	import './layout.css';
    let { children } = $props();
</script>

<Header/>
<div class="admin-wrapper">
    {@render children()}
</div>
