<!-- Source https://www.w3schools.com/howto/howto_js_slideshow.asp -->
<script lang="ts">
	import { page } from '$app/stores';
	import LoadScreen from '$lib/global/LoadScreen.svelte';

	import ImageContainer from '$lib/ImageContainer.svelte';
	import { onDestroy, onMount } from 'svelte';

	const searchParams = $page.url.searchParams;

	let error = false;
	let transitionTime = searchParams.has('transitionTime')
		? Number(searchParams.get('transitionTime'))
		: 5000;
	let images: { id: number; src: string; title: string; active: boolean }[] = [];
	let slideIndex = 0;
	let timeout: NodeJS.Timeout;

	async function getImage() {
		fetch('getImages', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		}).then(async (response) => {
			if (response.status === 200) {
				const data = await response.json();
				images = data['content'];

				showSlides();
				return;
			}

			error = true;
		});
	}

	function showSlides() {
		for (const image of images) {
			image.active = false;
		}
		slideIndex++;
		if (slideIndex > images.length) {
			slideIndex = 1;
		}
		images[slideIndex - 1].active = true;
		timeout = setTimeout(showSlides, transitionTime);
	}

	onMount(() => getImage());

	onDestroy(() => clearTimeout(timeout));
</script>

{#if images.length}
	<!-- Slideshow container -->
	<div>
		<div>
			<!-- Full-width images -->
			<div class="grid grid-cols-[1fr]">
				{#each images as image (image.id)}
					<ImageContainer background={true} bind:image />
					<ImageContainer bind:image />
				{/each}
			</div>
		</div>
	</div>
{:else if error}
	<div class="bg-gray-200 dark:bg-gray-600 h-screen w-screen flex justify-center items-center">
		<h1 class="text-7xl font-bold text-gray-800 dark:text-gray-200 mb-3">
			Images not avaliable, please, return to <a
				class="underline hover:text-gray-900 hover:dark:text-gray-100"
				href="/">Home</a
			> screen!
		</h1>
	</div>
{:else}
	<LoadScreen />
{/if}
