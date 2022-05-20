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
		let i;
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
<div class="w-full relative m-auto">
	<!-- Full-width images -->
    <div class="grid grid-cols-[1fr]">
        {#each images as image, index (image.id)}
            <ImageContainer bind:image {index} length={images.length} />
        {/each}
    </div>

	<!-- Next/Previous buttons -->
	<button
		class="absolute top-1/2 w-auto mt-[-22px] p-4 text-white font-bold text-[18px] rounded-tr-sm rounded-br-sm hover:bg-black/80"
		>&#10094;</button
	>
	<button
		class="absolute top-1/2 w-auto mt-[-22px] p-4 text-white font-bold text-[18px] rounded-tl-sm rounded-bl-sm hover:bg-black/80 right-0"
		>&#10095;</button
	>
</div>
<!-- Dots -->
<div class="text-center mt-3">
	{#each images as image (image.id)}
		<span
			class="dot cursor-pointer h-4 w-4 mx-1 rounded-full inline-block {image.active
				? 'bg-gray-900'
				: 'bg-gray-600'} hover:bg-gray-900"
		/>
	{/each}
</div>
