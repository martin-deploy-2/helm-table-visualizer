<script lang="ts">
  import dig from "../utilities/dig"
  import type Key from "../utilities/Key"
  import Td from "./Td.svelte"

  export let key: Key
  export let valuesFiles: Array<{
    toggled: boolean
    path: string
    data: any
  }>

  $: depth = key.path.length - 1
  $: leaf = key.path.at(-1)

  function digOrFallback(keyPath: string[], valuesFiles: Array<{ toggled: boolean, data: any }>, i: number): { value: any, valueFromFallback: boolean } {
    let dug: any
    let j = i + 1

    do
      if (valuesFiles[--j].toggled)
        dug = dig(keyPath, valuesFiles[j].data)
    while (typeof dug == "undefined" && j > 0)

    return { value: dug, valueFromFallback: j != i }
  }
</script>

<tr>
  <td style="position: sticky; left: 0; border-bottom: 1px solid var(--vscode-tree-tableColumnsBorder); border-right: 1px solid var(--vscode-editorStickyScroll-shadow); padding-left: {depth}em; vertical-align: top;">
    <label>
      <input type="checkbox" bind:checked={key.expanded}/>
      <code style="white-space: preserve; font-family: var(--vscode-editor-font-family); font-size: var(--vscode-editor-font-size); font-weight: var(--vscode-editor-font-weight); background: none;">
        { leaf }
      </code>
    </label>
  </td>
  {#each valuesFiles as v, i}
    {#if v.toggled}
      <td style="border-bottom: 1px solid var(--vscode-tree-tableColumnsBorder); border-right: 1px solid var(--vscode-editorStickyScroll-shadow); vertical-align: top;">
        <Td {...digOrFallback(key.path, valuesFiles, i)}/>
      </td>
    {/if}
  {/each}
</tr>

{#if key.expanded}
  {#each Object.values(key.children).sort((a, b) => a.order - b.order) as childKey}
    <svelte:self key={childKey} {valuesFiles} />
  {/each}
{/if}

<style>
  tr > td:nth-child(1) {
    background: var(--vscode-editorStickyScroll-background);
  }

  tr:hover > td {
    background: var(--vscode-editorStickyScrollHover-background);
  }
</style>
