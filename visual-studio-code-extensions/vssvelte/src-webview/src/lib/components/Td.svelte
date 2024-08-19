<script lang="ts">
  import isDict from "../utilities/isDict"

  export let value: any
  export let valueFromFallback: boolean
</script>

{#if value === undefined}
  <div style="width: 100%; height: 100%; text-align: center; font-family: var(--vscode-editor-font-family); font-size: var(--vscode-editor-font-size); font-weight: var(--vscode-editor-font-weight); color: var(--vscode-charts-lines);">?</div>
{:else if value === null}
  <div style="width: 100%; height: 100%; text-align: center; font-family: var(--vscode-editor-font-family); font-size: var(--vscode-editor-font-size); font-weight: var(--vscode-editor-font-weight); color: var(--vscode-charts-red); {valueFromFallback ? "opacity: 70%;" : "background: color-mix(in srgb, transparent, var(--vscode-charts-red) 10%);"}">~</div>
{:else if typeof value == "boolean"}
  <div style="width: 100%; height: 100%; text-align: center; font-family: var(--vscode-editor-font-family); font-size: var(--vscode-editor-font-size); font-weight: var(--vscode-editor-font-weight); color: var(--vscode-charts-blue); {valueFromFallback ? "opacity: 70%;" : "background: color-mix(in srgb, transparent, var(--vscode-charts-blue) 10%);"}">{value ? "true" : "false"}</div>
{:else if typeof value == "number"}
  <div style="width: 100%; height: 100%; text-align: right; font-family: var(--vscode-editor-font-family); font-size: var(--vscode-editor-font-size); font-weight: var(--vscode-editor-font-weight); color: var(--vscode-charts-green); {valueFromFallback ? "opacity: 70%;" : "background: color-mix(in srgb, transparent, var(--vscode-charts-green) 10%);"}">{value}</div>
{:else if typeof value == "string"}
  <div style="width: 100%; height: 100%; text-align: left; font-family: var(--vscode-editor-font-family); font-size: var(--vscode-editor-font-size); font-weight: var(--vscode-editor-font-weight); color: var(--vscode-charts-orange); {valueFromFallback ? "opacity: 70%;" : "background: color-mix(in srgb, transparent, var(--vscode-charts-orange) 10%);"} text-wrap: nowrap; white-space: preserve;">{value}</div>
{:else if Array.isArray(value)}
  <div style="width: 100%; height: 100%; text-align: left; font-family: var(--vscode-editor-font-family); font-size: var(--vscode-editor-font-size); font-weight: var(--vscode-editor-font-weight); color: var(--vscode-charts-yellow); {valueFromFallback ? "opacity: 70%;" : "background: color-mix(in srgb, transparent, var(--vscode-charts-yellow) 10%);"}">{"[]"}</div>
{:else if isDict(value)}
  <div style="width: 100%; height: 100%; text-align: left; font-family: var(--vscode-editor-font-family); font-size: var(--vscode-editor-font-size); font-weight: var(--vscode-editor-font-weight); color: var(--vscode-charts-purple); {valueFromFallback ? "opacity: 70%;" : "background: color-mix(in srgb, transparent, var(--vscode-charts-purple) 10%);"}">{"{}"}</div>
{/if}
