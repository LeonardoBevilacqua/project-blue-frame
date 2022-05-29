<!-- Source https://www.w3schools.com/howto/howto_js_slideshow.asp -->
<script lang="ts">
	import ImageContainer from '$lib/ImageContainer.svelte';
	import { onDestroy, onMount } from 'svelte';

	let images: { id: number; src: string; title: string; active: boolean }[] = [];

	async function getImage() {
		const response = await fetch('getImages', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		});
		const data = await response.json();
		images = data['content'];

		showSlides()
	}

	let slideIndex = 0;
	let timeout: NodeJS.Timeout;

	function showSlides() {
		for (const image of images) {
			image.active = false;
		}
		slideIndex++;
		if (slideIndex > images.length) {
			slideIndex = 1;
		}
		images[slideIndex - 1].active = true;
		timeout = setTimeout(showSlides, 2000); // Change image every 2 seconds
	}

	onMount(() => getImage());

	onDestroy(() => clearTimeout(timeout));
</script>

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
