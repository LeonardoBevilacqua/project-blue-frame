<script>
	import '../app.css';
</script>

<main class="h-screen w-screen flex items-center justify-center bg-gray-200 dark:bg-gray-600">
	<div
		class="grid grid-flow-col gap-3 p-3 items-center rounded-md bg-gray-300 dark:bg-slate-700 shadow-md"
	>
		<slot />
	</div>
</main>
