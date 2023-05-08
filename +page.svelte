<script lang="ts">
	import { onMount } from 'svelte';

	// URL OF THE CAMERA SERVER
	const CAMERA_URL = '192.168.4.1';
	// WEBSOCKET FORMAT
	const webSocketCameraUrl = `ws://${CAMERA_URL}/camera`;

	let image: HTMLImageElement;

	// when component loaded/mounted do these
	onMount(() => {
		// set-up websocket connection to the server
		const ws = new WebSocket(webSocketCameraUrl);

		// set-up binary type of the websocket connection to 'blob'
		// 'blob' is short for binary large object, by setting this way,
		// we expect the message to be large binary data
		ws.binaryType = 'blob';

		function initCameraWebSocket() {
			// when websocket connection closed for some reason
			ws.onclose = function () {
				// reinit the connection
				setTimeout(initCameraWebSocket, 1000);
			};

			// when websocket connection receive message (data) from server
			ws.onmessage = function (event) {
				// bind the binary data to the image source
				image.src = URL.createObjectURL(event.data);
			};
		}

		initCameraWebSocket();
	});

	let flashLightStatus: boolean = false;

	// whenever the Flashlight status changes, call toggleFlashlight()
	$: toggleFlashlight(flashLightStatus);

	async function toggleFlashlight(status: boolean) {
		// if status is true then state = "on"
		// else state = "on"
		const state = status ? 'on' : 'off';

		try {
			// call camera server to enable/disable flashlight
			await fetch(`http://${CAMERA_URL}/led?state=${state}`);
		} catch (error) {
			console.log(error);
		}
	}
</script>

<div>
	<img bind:this={image} id="cameraImage" src="" alt="video-stream" />
</div>

<div class="px-4 py-16">
	<h1 class="font-bold text-2xl">Your Camera</h1>

	<div class="flex gap-2 mt-4">
		<input bind:checked={flashLightStatus} type="checkbox" class="toggle" />
		<p>Enable Flashlight</p>
	</div>
</div>
