<script lang="ts">
	export let label: string;
	export let id: string;
	export let checked: boolean;
</script>

<!-- Toggle A -->
<label for={id} class="flex items-center cursor-pointer">
	<!-- toggle -->
	<div class="relative">
		<!-- input -->
		<input {id} type="checkbox" class="sr-only" role="switch" bind:checked={checked} />
		<!-- line -->
		<div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner" />
		<!-- dot -->
		<div class="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition" />
	</div>
	<!-- label -->
	<div class="ml-3 text-gray-200 font-medium">{label}</div>
</label>

<style>
	/* Toggle A */
	input:checked ~ .dot {
		transform: translateX(100%);
		background-color: rgb(96 165 250 / var(--tw-bg-opacity));
	}
</style>
