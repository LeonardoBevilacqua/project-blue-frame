<script lang="ts">
	import Button from '$lib/global/Button.svelte';
	import LoadScreen from '$lib/global/LoadScreen.svelte';
	import NotificationToast from '$lib/global/NotificationToast.svelte';

	let fileInput: HTMLInputElement;
	let files: FileList;
	let imagePreview: string;
	let album: string;
	let notificationToast: NotificationToast;

	let errors: string[] = [];
	let loading = false;

	/**
	 * Method responsible to get image base 64 from the first file
	 */
	function displayImagePreview() {
		const image = files[0];
		const reader = new FileReader();

		reader.readAsDataURL(image);
		reader.onload = (e: ProgressEvent<FileReader>) => {
			imagePreview = e.target?.result?.toString() ?? '';
		};
	}

	/**
	 * Method responsible to validate inputs
	 */
	function validation() {
		errors = [];

		if (!imagePreview) {
			errors.push('Image must not me null!');
		}

		if (!album) {
			errors.push('Album name must not me null!');
		}
		return !errors.length;
	}

	/**
	 * Method responsible to upload the image to server
	 */
	async function uploadImage() {
		const data = { image: '', name: '' };
		if (!validation()) {
			return;
		}

		const image = files[0];
		const reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e: ProgressEvent<FileReader>) => {
			loading = true;
			const image = e.target?.result?.toString() ?? '';
			const imgData = image.split(',');
			data.image = imgData[1];
			data.name = files[0].name;
			fetch(`${album}/upload`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify(data)
			}).finally(() => {
				notificationToast.displayNotification('Image uploaded with success');
                loading = false;
			});
		};
	}
</script>

<NotificationToast bind:this={notificationToast} />
{#if loading}
	<LoadScreen />
{/if}

<main class="h-screen w-screen flex items-center justify-center bg-gray-200 dark:bg-gray-600">
	<div
		class="grid grid-flow-col gap-3 p-3 items-center rounded-md bg-gray-300 dark:bg-slate-700 shadow-md"
	>
		{#if errors.length}
			<div
				class="col-span-3 bg-red-400 dark:bg-red-600 text-gray-200 p-1 text-sm rounded-sm shadow-md"
			>
				<ul>
					{#each errors as error, index (index)}
						<li>{error}</li>
					{/each}
				</ul>
			</div>
		{/if}

		<div class="row-start-2 flex flex-col items-center gap-3">
            <div class="h-[300px] flex items-center">
                <img
                    id="imagePreview"
                    class="rounded-md shadow-sm max-h-[300px]"
                    width="300"
                    height="300"
                    src={imagePreview ? imagePreview : '/placeholder.png'}
                    alt="Preview"
                />

            </div>
			<input
				class="hidden"
				id="file-to-upload"
				type="file"
				accept=".png,.jpg"
				bind:files
				bind:this={fileInput}
				on:change={displayImagePreview}
			/>
			<Button on:click={() => fileInput.click()}>Browse</Button>
		</div>

		<div class="row-start-2 flex flex-col justify-center h-full gap-3">
			<input
				class="mt-auto mb-auto bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300 dark:focus-visible:outline-cyan-600 p-2 rounded-sm shadow-sm"
				id="album"
				type="text"
				bind:value={album}
				placeholder="Album"
			/>
			<Button on:click={uploadImage}>Upload</Button>
		</div>
	</div>
</main>
