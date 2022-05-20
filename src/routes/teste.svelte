<!-- Source https://www.w3schools.com/howto/howto_js_slideshow.asp -->
<script lang="ts">
	import ImageContainer from '$lib/ImageContainer.svelte';
	import { onDestroy, onMount } from 'svelte';

	const images = [
		{
			id: 1,
			src: 'https://picsum.photos/seed/picsum01/1920/1080',
			title: 'Teste 01',
			active: false
		},
		{
			id: 2,
			src: 'https://picsum.photos/seed/picsum02/1920/1080',
			title: 'Teste 02',
			active: false
		},
		{
			id: 3,
			src: 'https://picsum.photos/seed/picsum03/1920/1080',
			title: 'Teste 03',
			active: false
		},
		{
			id: 4,
			src: 'https://picsum.photos/seed/picsum04/1920/1080',
			title: 'Teste 04',
			active: false
		}
	];

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

	onMount(() => showSlides());

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
