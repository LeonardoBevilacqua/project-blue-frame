<script lang="ts">
	import Button from '$lib/global/Button.svelte';
	import LoadScreen from '$lib/global/LoadScreen.svelte';
	import NotificationToast from '$lib/global/NotificationToast.svelte';
	import SwitchBox from '$lib/global/SwitchBox.svelte';
	import { post, readFile, type FileResult } from '$lib/utils/utils';

	let fileInput: HTMLInputElement;
	let files: FileList;
	let imagePreview: string;
	let album: string;
	let clearAlbum = false;
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
	 * Method responsible to clean the data
	 */
	function cleanData() {
		imagePreview = '';
		if (clearAlbum) {
			album = '';
		}
	}

	/**
	 * Method responsible to upload the image to server
	 */
	async function uploadImage() {
		if (!validation()) {
			return;
		}

		loading = true;
		let readers: Promise<FileResult>[] = [];

		Array.from(files).forEach((file) => {
			readers.push(readFile(file));
		});

		Promise.all(readers)
			.then((images) => {
				images.forEach((image) =>
					post(`${album}/upload`, { image: image.result.split(',')[1], name: image.name })
				);
			})
			.finally(() => {
				notificationToast.displayNotification('Images uploaded with success');
				loading = false;
				cleanData();
			});
	}
</script>

<NotificationToast bind:this={notificationToast} />
{#if loading}
	<LoadScreen />
{/if}

{#if errors.length}
	<div class="col-span-3 bg-red-400 dark:bg-red-600 text-gray-200 p-1 text-sm rounded-sm shadow-md">
		<ul>
			{#each errors as error, index (index)}
				<li>{error}</li>
			{/each}
		</ul>
	</div>
{/if}

<div class="row-start-2 flex flex-col items-center gap-3">
	<span class="text-gray-800 dark:text-gray-200"
		>{imagePreview ? `${files.length} images selected` : 'Select your images'}</span
	>
	<div class="h-[300px] flex items-center">
		<img
			id="imagePreview"
			class="rounded-md shadow-sm max-h-[300px]"
			width="300"
			height="300"
			src={imagePreview ? imagePreview : '/placeholder.png'}
			alt="Preview"
			on:click={() => fileInput.click()}
		/>
	</div>
	<input
		class="hidden"
		id="file-to-upload"
		type="file"
		accept=".png,.jpg"
		multiple
		bind:files
		bind:this={fileInput}
		on:change={displayImagePreview}
	/>
	<Button on:click={() => fileInput.click()}>Browse</Button>
</div>

<div class="row-start-2 flex flex-col justify-center h-full gap-3">
	<input
		class="mt-auto bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300 dark:focus-visible:outline-cyan-600 p-2 rounded-sm shadow-sm"
		id="album"
		type="text"
		bind:value={album}
		placeholder="Album"
	/>

	<div class="mb-auto">
		<SwitchBox bind:checked={clearAlbum} id={'clearAlbum'} label={'Clear album after upload'} />
	</div>

	<Button on:click={uploadImage}>Upload</Button>
</div>
