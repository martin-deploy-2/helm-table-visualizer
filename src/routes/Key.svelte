<script lang="ts">
	import type { ComponentProps } from "svelte"
	import Val, { ValType } from "./Val.svelte"

	interface $$Props {
		path: Array<string>
		values: Array<ComponentProps<Val>>
		children?: Array<$$Props>
	}

	export let path: Array<string>
	export let values: Array<ComponentProps<Val>> = []
	export let children: Array<$$Props> = []

	$: depth = path.length - 1
	$: name = path.at(-1)
	$: expandable = values.some(v => v.type == ValType.DICT)
	$: expanded = expandable
</script>

<tr>
	<th scope="row" class="position-sticky start-0 z-2 bg-secondary-subtle text-nowrap">
		<input class="d-inline form-check-input TreeExpand" type="checkbox" bind:checked={expanded} disabled={!expandable}/>
		<span class="font-monospace fw-normal" style="white-space: preserve; text-wrap: nowrap;">{"  ".repeat(depth)}{name}</span>
	</th>
	{#each values as value}
		<td class="p-0">
			<Val {...value}/>
		</td>
	{/each}
</tr>

{#if expanded}
	{#each children as child}
		<svelte:self {...child} depth={depth + 1}/>
	{/each}
{/if}

<style>
	input[type="checkbox"].TreeExpand {
		border: none;
		background-color: transparent;
		--bs-form-check-bg-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%237f7f7f' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10h8 M10 6v8'/%3e%3c/svg%3e");
	}
	input[type="checkbox"].TreeExpand:checked {
		--bs-form-check-bg-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%237f7f7f' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10h8'/%3e%3c/svg%3e");
	}
</style>
