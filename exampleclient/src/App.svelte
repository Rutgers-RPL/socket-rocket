<script>
	export let name;

	import { onMount } from "svelte";

	let socket;


	onMount( () => {
		socket = new WebSocket('ws://localhost:8765');

		socket.onopen = () => {
			console.log('Connected to server');

		}
		socket.onmessage = (event) => {
			console.log(event.data);
		}

	})


</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>