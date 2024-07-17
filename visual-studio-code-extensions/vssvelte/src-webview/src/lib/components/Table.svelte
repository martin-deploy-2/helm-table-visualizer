<script lang="ts">
  import extractKeys from "../utilities/extractKeys"
  import Tr from "./Tr.svelte"

  export let valuesFiles: Array<{
    toggled: boolean
    path: string
    data: any
  }>

  $: keys = extractKeys(valuesFiles.filter(v => v.toggled).map(f => f.data))
</script>

<table>
  <thead style="text-align: left;">
    <tr>
      <th style="position: sticky; top: 0; left: 0; z-index: 10; background: var(--vscode-editorStickyScrollHover-background); border-bottom: 2px solid var(--vscode-tree-tableColumnsBorder); min-width: 200px;">Keys \ Values</th>
      {#each valuesFiles as v}
        {#if v.toggled}
          <th style="position: sticky; top: 0; background: var(--vscode-editorStickyScrollHover-background); border-bottom: 2px solid var(--vscode-tree-tableColumnsBorder); min-width: 300px;">{v.path}</th>
        {/if}
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each Object.values(keys).sort((a, b) => a.order - b.order) as key}
      <Tr {key} {valuesFiles} />
    {/each}
  </tbody>
</table>
