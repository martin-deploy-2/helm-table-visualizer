<script lang="ts">
	import { store as valuesFiles } from "$lib/stores/values-files"
	import { store as valuesKeys } from "$lib/stores/values-keys"

	import TableRow from "./TableRow.svelte"
</script>

<div class="table">
	<table>
		<thead>
			<tr>
				<th role="columnheader">Keys \ Values files</th>

				{#each $valuesFiles as f (f.path)}
					{#if f.selected}
						<th role="columnheader">{f.path}</th>
					{/if}
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each $valuesKeys as k (k.path.join("\\"))}
				<TableRow key={k}/>
			{/each}
		</tbody>
	</table>
</div>

<style>
	:root {
		font-family: sans-serif;
		font-size: 14px;
	}
	table {
		border-collapse: collapse;
	}
	th {
		border: 1px solid grey;
		padding: 3px 6px;
		text-align: left;
	}
</style>
