<script lang="ts">
	export let image: {
		id: number;
		src: string;
		title: string;
		active: boolean;
	};
    export let index: number
    export let length: number
</script>
<div class="{image.active ? 'block' : 'hidden'}">
	<div class="text-gray-500 text-[12px] py-2 px-3 absolute top-0">{index} / {length}</div>
	<img class="w-full" src={image.src} alt={image.title} />
	<div class="text-gray-500 text-[15px] py-2 px-3 absolute bottom-2 w-full text-center">
		{image.title}
	</div>
</div>
