<script lang="ts">
	export let image: {
		id: number;
		src: string;
		title: string;
		active: boolean;
	};
	export let background = false;
</script>

<div
	class="row-start-1 col-start-1 transition-opacity duration-1000 {image.active
		? 'opacity-100'
		: 'opacity-0'}"
	class:z-10={!background}
	class:m-auto={!background}
	class:h-screen={background}
>
	<img
		class="w-full"
		class:h-full={background}
		class:blur-sm={background}
		src={image.src}
		alt={image.title}
	/>
</div>
