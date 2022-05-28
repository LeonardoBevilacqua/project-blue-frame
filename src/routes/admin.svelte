<script lang="ts">
import Button from "$lib/global/Button.svelte";

	let fileInput: HTMLInputElement;
	let files: FileList;
	let imagePreview: string | ArrayBuffer | null | undefined;

	function getBase64(image: Blob) {
		const reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e: ProgressEvent<FileReader>) => {
			imagePreview = e.target?.result;
		};
	}

	async function uploadFunction(imgBase64: string | ArrayBuffer | null | undefined) {
		const data = { image: '' };
		if (!imgBase64) {
			return;
		}
		const imgData = imgBase64.toString().split(',');
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

<div class="flex flex-col items-center gap-3 m-3">
	<img
		id="imagePreview"
		width="300"
		height="300"
		src={imagePreview ? imagePreview.toString() : 'https://via.placeholder.com/300.png/09f/fff'}
		alt="Preview"
	/>
	<input
		class="hidden"
		id="file-to-upload"
		type="file"
		accept=".png,.jpg"
		bind:files
		bind:this={fileInput}
		on:change={() => getBase64(files[0])}
	/>

	<Button on:click={() => fileInput.click()}>Select image</Button>
	<Button on:click={() => uploadFunction(imagePreview)}>Upload</Button>
</div>
