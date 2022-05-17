<!-- Source https://www.w3schools.com/howto/howto_js_slideshow.asp -->
<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	let slideIndex = 0;
	let timeout: NodeJS.Timeout;

	function showSlides() {
		let i;
		let slides = document.getElementsByClassName('mySlides');
		let dots = document.getElementsByClassName('dot');
		for (i = 0; i < slides.length; i++) {
			slides[i].style.display = 'none';
		}
		slideIndex++;
		if (slideIndex > slides.length) {
			slideIndex = 1;
		}
		for (i = 0; i < dots.length; i++) {
			dots[i].className = dots[i].className.replace(' bg-gray-900', '');
		}
		slides[slideIndex - 1].style.display = 'block';
		dots[slideIndex - 1].className += ' bg-gray-900';
		timeout = setTimeout(showSlides, 2000); // Change image every 2 seconds
	}

	onMount(() => showSlides());

	onDestroy(() => clearTimeout(timeout));
</script>

<!-- Slideshow container -->
<div class="w-full relative m-auto">
	<!-- Full-width images -->
	<div class="mySlides">
		<div class="text-gray-100 text-[12px] py-2 px-3 absolute top-0">1 / 4</div>
		<img class="w-full" src="https://picsum.photos/seed/picsum1/500/150" alt="teste 01" />
		<div class="text-gray-100 text-[15px] py-2 px-3 absolute bottom-2 w-full text-center">
			teste 01
		</div>
	</div>

	<div class="mySlides">
		<div class="text-gray-100 text-[12px] py-2 px-3 absolute top-0">2 / 4</div>
		<img class="w-full" src="https://picsum.photos/seed/picsum2/500/150" alt="teste 02" />
		<div class="text-gray-100 text-[15px] py-2 px-3 absolute bottom-2 w-full text-center">
			teste 02
		</div>
	</div>

	<div class="mySlides">
		<div class="text-gray-100 text-[12px] py-2 px-3 absolute top-0">3 / 4</div>
		<img class="w-full" src="https://picsum.photos/seed/picsum3/500/150" alt="teste 03" />
		<div class="text-gray-100 text-[15px] py-2 px-3 absolute bottom-2 w-full text-center">
			teste 03
		</div>
	</div>

	<div class="mySlides">
		<div class="text-gray-100 text-[12px] py-2 px-3 absolute top-0">4 / 4</div>
		<img class="w-full" src="https://picsum.photos/seed/picsum4/500/150" alt="teste 04" />
		<div class="text-gray-100 text-[15px] py-2 px-3 absolute bottom-2 w-full text-center">
			teste 04
		</div>
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
	<span
		class="dot cursor-pointer h-4 w-4 mx-1 bg-gray-600 rounded-full inline-block hover:bg-gray-900"
	/>
	<span
		class="dot cursor-pointer h-4 w-4 mx-1 bg-gray-600 rounded-full inline-block hover:bg-gray-900"
	/>
	<span
		class="dot cursor-pointer h-4 w-4 mx-1 bg-gray-600 rounded-full inline-block hover:bg-gray-900"
	/>
	<span
		class="dot cursor-pointer h-4 w-4 mx-1 bg-gray-600 rounded-full inline-block hover:bg-gray-900"
	/>
</div>

<style>
	.mySlides {
		display: none;
	}
</style>
