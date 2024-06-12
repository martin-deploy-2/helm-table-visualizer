<script lang="ts">
	import { store as valuesFiles } from "$lib/stores/values-files"
	import type { ValuesKey } from "$lib/stores/values-keys"
	import TableDiv from "./TableDiv.svelte"

	export let key: ValuesKey
</script>

<tr>
	<th role="rowheader"><pre>{"  ".repeat(key.path.length - 1)}{key.path.at(-1)}</pre></th>
	{#each $valuesFiles as f (f.path)}
		{#if f.selected}
			<TableDiv key={key} file={f}/>
		{/if}
	{/each}
</tr>

{#each key.children as c (c.path.join("\\"))}
	<svelte:self key={c}/>
{/each}

<style>
	th {
		border: 1px solid grey;
		padding: 3px 6px;
	}
	th {
		text-align: left;
	}
	pre {
		display: inline;
	}
</style>
