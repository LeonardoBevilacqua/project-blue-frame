<script lang="ts">
import Button from "$lib/global/Button.svelte";

	let fileInput: HTMLInputElement;
	let files: FileList;
	let imagePreview: string;

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
	 * Method responsible to upload the image to server
	 */
	async function uploadImage() {
		const data = { image: '' };
		if (!imagePreview) {
			return;
		}
		const imgData = imagePreview.split(',');
		data.image = imgData[1];
		console.log(data);
		await fetch(`/upload`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify(data)
		});
	}
</script>

 <main class="h-screen w-screen flex items-center justify-center bg-gray-300 dark:bg-gray-800">
	<div class="grid grid-flow-col gap-3 p-3 items-center bg-fuchsia-200">
		<div class="flex flex-col items-center gap-3">
			<img
				id="imagePreview"
				width="300"
				height="300"
				src={imagePreview ? imagePreview : 'https://via.placeholder.com/300.png/09f/fff'}
				alt="Preview"
			/>
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

		<div class="flex flex-col justify-center h-full gap-3">
			<input class="mt-auto mb-auto" type="text" placeholder="Album">
			<Button on:click={uploadImage}>Upload</Button>
		</div>
	</div>
</main>
