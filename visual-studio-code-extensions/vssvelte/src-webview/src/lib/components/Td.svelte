<script lang="ts">
  import isDict from "../utilities/isDict"

  export let value: any
</script>

{#if value === undefined}
  <input style="text-align: center; border: none; width: 100%; height: 100%; font-family: var(--vscode-editor-font-family); font-size: var(--vscode-editor-font-size); font-weight: var(--vscode-editor-font-weight); color: var(--vscode-charts-lines); background: transparent;" type="text" value="?" readonly/>
{:else if value === null}
  <input style="text-align: center; border: none; width: 100%; height: 100%; font-family: var(--vscode-editor-font-family); font-size: var(--vscode-editor-font-size); font-weight: var(--vscode-editor-font-weight); color: var(--vscode-charts-red); background: transparent;" type="text" value="~" readonly/>
{:else if typeof value == "boolean"}
  <input style="min-width: 100%; min-height: 100%; background: var(--vscode-charts-blue);" type="checkbox" checked={value} {...{ onclick: "return false;" }}/>
{:else if typeof value == "number"}
  <input style="border: none; width: 100%; height: 100%; text-align: right; font-family: var(--vscode-editor-font-family); font-size: var(--vscode-editor-font-size); font-weight: var(--vscode-editor-font-weight); color: var(--vscode-charts-green); background: transparent;" type="number" value="{value}" readonly/>
{:else if typeof value == "string"}
  <div style="min-width: 100%; min-height: 100%; font-family: var(--vscode-editor-font-family); font-size: var(--vscode-editor-font-size); font-weight: var(--vscode-editor-font-weight); color: var(--vscode-charts-orange); background: transparent; text-wrap: nowrap; white-space: preserve;" role="textbox">{value}</div>
{:else if Array.isArray(value)}
  <input style="text-align: center; border: none; width: 100%; height: 100%; font-family: var(--vscode-editor-font-family); font-size: var(--vscode-editor-font-size); font-weight: var(--vscode-editor-font-weight); color: var(--vscode-charts-yellow); background: transparent;" type="text" value="[]" readonly/>
{:else if isDict(value)}
  <input style="text-align: center; border: none; width: 100%; height: 100%; font-family: var(--vscode-editor-font-family); font-size: var(--vscode-editor-font-size); font-weight: var(--vscode-editor-font-weight); color: var(--vscode-charts-purple); background: transparent;" type="text" value="{"{}"}" readonly/>
{/if}
