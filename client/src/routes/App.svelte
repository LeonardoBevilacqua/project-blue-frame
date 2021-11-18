<script lang="ts">
	import { onMount } from "svelte";
	import { AppService } from "../services/App.service";

	let frontImageHidden = false;
	let images = [];
	let backImage = "";
	let frontImage = "";
	let transitionTime = 5;
	let animationTime = 2;
	let index = 0;

	onMount(async () => {
		const appService = new AppService();
		const data: any[] = await appService.getImages();
		if (data.length) {
			images = data;
			backImage = `${process.env.serverUrl || "http://localhost:5000"}/albums/image/${data[index]["id"]}`;
			index = 1;
			frontImage = `${process.env.serverUrl || "http://localhost:5000"}/albums/image/${data[index]["id"]}`;
		}

		setInterval(() => {
			//console.log(`This will run each ${transitionTime} second!`);
			setBackAndFrontImages();
		}, 1000 * transitionTime);
	});

	const setBackAndFrontImages = () => {
		if (images.length) {
			frontImageHidden = !frontImageHidden;
			index = index + 1 >= images.length ? 0 : index + 1;
			//console.log(`This will run after ${animationTime} second!`, `current index ${index} of ${images.length}`);
			if (frontImageHidden) {
				frontImage = `${process.env.serverUrl || "http://localhost:5000"}/albums/image/${images[index]["id"]}`;
			} else {
				backImage = `${process.env.serverUrl || "http://localhost:5000"}/albums/image/${images[index]["id"]}`;
			}
		}
	};
</script>

<div class="container">
	<div
		class="background"
		style="background-image: {frontImageHidden
			? `url(${frontImage})`
			: `url(${backImage})`}"
	>
		<img
			class={`${frontImageHidden ? "fade-out" : "fade-in"}`}
			style="animation-duration: {`${animationTime}s`}"
			src={backImage}
			alt={backImage}
		/>
		<img
			class={`${!frontImageHidden ? "fade-out" : "fade-in"}`}
			style="animation-duration: {`${animationTime}s`}"
			src={frontImage}
			alt={frontImage}
		/>
	</div>
	<div
		class={`image-container ${frontImageHidden ? "fade-out" : "fade-in"}`}
		style="animation-duration: {`${animationTime}s`}"
	>
		<img src={backImage} alt={backImage} />
	</div>
	<div
		class={`image-container ${!frontImageHidden ? "fade-out" : "fade-in"}`}
		style="animation-duration: {`${animationTime}s`}"
	>
		<img src={frontImage} alt={frontImage} />
	</div>
</div>

<style>
	.container {
		width: 100vw;
		height: 100vh;
		background-color: black;
	}

	.image-container {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		max-height: 100vh;
		max-width: 100vw;
	}

	.background {
		position: absolute;
		width: 100vw;
		height: 100vh;
		background-repeat: no-repeat;
		background-size: cover;
		-webkit-filter: blur(5px);
		-moz-filter: blur(5px);
		-o-filter: blur(5px);
		-ms-filter: blur(5px);
		filter: blur(5px);
	}

	.background > img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		cursor: none;
	}

	.fade-in {
		animation: fade-in;
	}

	.fade-out {
		animation: fade-out;
	}

	.fade-in,
	.fade-out {
		animation-fill-mode: forwards;
	}

	img {
		max-height: 100vh;
		max-width: 100vw;
		cursor: none;
	}

	@keyframes fade-out {
		from {
			opacity: 100%;
		}
		to {
			opacity: 0%;
		}
	}

	@keyframes fade-in {
		from {
			opacity: 0%;
		}
		to {
			opacity: 100%;
		}
	}
</style>
