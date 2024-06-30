<script lang="ts">
	import { browser } from "$app/environment"
	import { onMount } from "svelte"
	import "../app.scss"

	onMount(async () => {
		if (!browser) return
		const bootstrap = await import("bootstrap")
	})

	let theme = false

	$: {
		if (browser) {
			document.documentElement.setAttribute("data-bs-theme", theme ? "light" : "dark")
		}
	}
</script>

<input type="checkbox" bind:checked={theme}/>
<div class="container py-4 px-3 mx-auto">
	<h1>Hello, Bootstrap!</h1>
	<button class="btn btn-primary">Primary button</button>
</div>
