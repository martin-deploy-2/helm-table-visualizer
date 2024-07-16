<script lang="ts">
  import Table from "./Table.svelte"
  import vscode from "../utilities/vscode"

  interface State {
    chartFolder: string
    chartName: string
    valuesFiles: Array<{
      path: string
      data: any
    }>
  }

  let state = vscode.getState<State>() ?? {
    chartFolder: "(No chart)",
    chartName: "(No chart)",
    valuesFiles: []
  }

  function onMessage({ data }) {
    vscode.setState(data)
    state = data
  }
</script>

<svelte:window on:message={onMessage}/>

<Table {...state}/>
