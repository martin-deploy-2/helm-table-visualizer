<script lang="ts">
	import { store as valuesFiles, type ValuesFile } from "$lib/stores/values-files"
	import type { ValuesKey } from "$lib/stores/values-keys"

	export let key: ValuesKey
	export let file: ValuesFile

	function dig(key: ValuesKey, file: ValuesFile): { val: any, isDefault: boolean } {
		let val: any = file.values
		let isDefault = false

		for (let k of key.path) {
			if (k in val) {
				val = val[k]
			} else {
				val = undefined
				break
			}
		}

		let selectedValuesFiles = $valuesFiles.filter(f => f.selected)

		if (val === undefined && selectedValuesFiles.indexOf(file) > 0) {
			let x = dig(key, selectedValuesFiles[selectedValuesFiles.indexOf(file) - 1])

			val = x.val
			isDefault = true
		}

		return { val, isDefault }
	}

	$: value = dig(key, file)
</script>

<td style="opacity: {value.isDefault ? 50 : 100}%;">
	{#if value.val === undefined}
		<small>(?)</small>
	{:else if value.val === null}
		<small>(/)</small>
	{:else if Array.isArray(value.val)}
		<small>[ ]</small>
	{:else if value.val instanceof Object}
		<small>{"{ }"}</small>
	{:else }
		{value.val}
	{/if}
</td>

<style>
	td {
		border: 1px solid grey;
		padding: 3px 6px;
	}
</style>
