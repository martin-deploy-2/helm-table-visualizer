<script lang="ts" context="module">
	let idName = "Sidebar"
	let idCounter = 0
</script>

<script lang="ts">
	import { store as chart } from "$lib/stores/chart"
	import { store as valuesFiles } from "$lib/stores/values-files"
</script>

<div class="sidebar">
	{#if $chart}
		<h1>Chart: {$chart.name}</h1>
		<h2>Values files</h2>
		<ul>
			{#each $valuesFiles as f (f.path)}
				<li>
					<input type="checkbox" id={idName + ++idCounter} bind:checked={f.selected} disabled={f.path == "values.yaml"}/>
					<label for={idName + idCounter}>{f.path}</label>
				</li>
			{/each}
		</ul>
	{:else}
		<h1>Not a chart</h1>
	{/if}
</div>
