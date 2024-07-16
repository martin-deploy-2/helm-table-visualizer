<script lang="ts">
  import dig from "../utilities/dig"
  import type Key from "../utilities/Key"
  import Td from "./Td.svelte"

  export let key: Key
  export let valuesFiles: Array<{
    path: string
    data: any
  }>

  $: depth = key.path.length - 1
  $: leaf = key.path.at(-1)
</script>

<tr>
  <td style="position: sticky; left: 0; background: var(--vscode-editorStickyScroll-background); border-bottom: 1px solid var(--vscode-tree-tableColumnsBorder); border-right: 1px solid var(--vscode-editorStickyScroll-shadow); padding-left: {depth}em; vertical-align: top;">
    <code style="white-space: preserve; font-family: var(--vscode-editor-font-family); font-size: var(--vscode-editor-font-size); font-weight: var(--vscode-editor-font-weight); background: none;">
      { leaf }
    </code>
  </td>
  {#each valuesFiles as v}
    <td style="border-bottom: 1px solid var(--vscode-tree-tableColumnsBorder); border-right: 1px solid var(--vscode-editorStickyScroll-shadow);">
      <Td value={dig(key.path, v.data)}/>
    </td>
  {/each}
</tr>
{#if key.expanded}
  {#each Object.values(key.children).sort((a, b) => a.order - b.order) as childKey}
    <svelte:self key={childKey} {valuesFiles} />
  {/each}
{/if}
