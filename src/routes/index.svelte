<script lang="ts">
	import Button from '$lib/global/Button.svelte';
	import { onMount } from 'svelte';

	let albums: string[] = [];

	onMount(() => {
		fetch('albums', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		}).then(async (response) => {
			if (response.status === 200) {
				const data = await response.json();
				albums = data['content'];
			}
		});
	});
</script>

<svelte:head>
	<title>Blue Frame</title>
	<meta name="description" content="Blue frame" />
</svelte:head>

<section>
	<h1 class="text-7xl font-bold text-gray-800 dark:text-gray-200 mb-3">Welcome to Blue frame!</h1>
	<h2 class="text-5xl font-bold text-gray-800 dark:text-gray-200 mb-3">Let's getting started</h2>

	<div class="grid grid-flow-col gap-3 items-center mt-3 text-center">
		<a href="/admin"><Button>Add new images</Button></a>

		<div>
			<h3 class="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-3">Albums available:</h3>
			{#each albums as album, index (index)}
				<a class="block text-gray-800 dark:text-gray-200 text-lg" href={`${album}/display`}
					>{album}</a
				>
			{:else}
				<span class="block text-gray-800 dark:text-gray-200 text-lg">No album available</span>
			{/each}
		</div>
	</div>
</section>
