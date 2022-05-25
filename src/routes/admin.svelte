<script lang="ts">
	let fileInput: HTMLInputElement;
	let files: FileList;
	let avatar: string | ArrayBuffer | null | undefined;

	function getBase64(image: Blob) {
		const reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e: ProgressEvent<FileReader>) => {
			avatar = e.target?.result;
            uploadFunction(avatar);
		};
	}

	async function uploadFunction(imgBase64: string | ArrayBuffer | null | undefined) {
		const data = {image: ''};
        if (!imgBase64) {
            return
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

<div class="container">
	{#if avatar}
		<img id="avatar" src={avatar.toString()} alt="avatar" />
	{:else}
		<img id="avatar" src="avatar.png" alt="avatar" />
	{/if}
	<input
		class="hidden"
		id="file-to-upload"
		type="file"
		accept=".png,.jpg"
		bind:files
		bind:this={fileInput}
		on:change={() => getBase64(files[0])}
	/>
	<button class="upload-btn" on:click={() => fileInput.click()}>Upload</button>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	#avatar {
		border-radius: 99999px;
		height: 128px;
		width: 128px;
		margin-bottom: 10px;
	}

	.hidden {
		display: none;
	}

	.upload-btn {
		width: 128px;
		height: 32px;
		background-color: black;
		font-family: sans-serif;
		color: white;
		font-weight: bold;
		border: none;
	}

	.upload-btn:hover {
		background-color: white;
		color: black;
		outline: black solid 2px;
	}
</style>
