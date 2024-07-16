<script lang="ts">
  import extractKeys from "../utilities/extractKeys"
  import Tr from "./Tr.svelte"

  export let chartFolder: string
  export let chartName: string
  export let valuesFiles: Array<{
    path: string
    data: any
  }>

  $: keys = extractKeys(valuesFiles.map(f => f.data))
</script>

<div>Chart folder: {chartFolder}</div>
<div>Chart name: {chartName}</div>
<table>
  <thead style="text-align: left;">
    <tr>
      <th style="position: sticky; top: 0; left: 0; z-index: 10; background: var(--vscode-editorStickyScrollHover-background); border-bottom: 2px solid var(--vscode-tree-tableColumnsBorder); min-width: 200px;">Keys \ Values</th>
      {#each valuesFiles as v}
        <th style="position: sticky; top: 0; background: var(--vscode-editorStickyScrollHover-background); border-bottom: 2px solid var(--vscode-tree-tableColumnsBorder); min-width: 300px;">{v.path}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each Object.values(keys).sort((a, b) => a.order - b.order) as key}
      <Tr {key} {valuesFiles} />
    {/each}
  </tbody>
</table>
