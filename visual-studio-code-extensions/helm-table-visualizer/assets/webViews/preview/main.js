main()

/**
 * @param {object} vscode
 * @param {() => any} vscode.getState
 * @param {(message: any, transfer?: any) => void} vscode.postMessage
 * @param {(newState: any) => void} vscode.setState
 */
function main(vscode = acquireVsCodeApi()) {
  updateData(vscode.getState() ?? {
    yamlFile: "(No file)",
    yaml: {}
  })

  window.addEventListener("message", ({ data }) => {
    vscode.setState(data)
    updateData(data)
  }, false)
}

function updateData(data) {
  document.body.innerHTML = Table(data)
}

function Table({ yamlFile, yaml }) {
  return /* html */ `
    <table>
      <thead style="text-align: left;">
        <tr>
          <th style="position: sticky; top: 0; left: 0; z-index: 10; background: var(--vscode-editorStickyScrollHover-background); border-bottom: 2px solid var(--vscode-tree-tableColumnsBorder); min-width: 200px;">Key</th>
          <th style="position: sticky; top: 0; background: var(--vscode-editorStickyScrollHover-background); border-bottom: 2px solid var(--vscode-tree-tableColumnsBorder); min-width: 300px;">Value</th>
        </tr>
      </thead>
      <tbody>
        ${ Object.entries(yaml).map(([key, value]) => Tr({ key, value })).join("") }
      </tbody>
    </table>
  `
}

function Tr({ key, value, depth = 0 }) {
  const valueIsDict = typeof value == "object" && value !== null && !Array.isArray(value)

  return /* html */ `
    <tr>
      <td style="position: sticky; left: 0; background: var(--vscode-editorStickyScroll-background); border-bottom: 1px solid var(--vscode-tree-tableColumnsBorder); padding-left: ${ depth }em; vertical-align: top;"><code style="white-space: preserve; font-family: var(--vscode-editor-font-family); font-size: var(--vscode-editor-font-size); font-weight: var(--vscode-editor-font-weight); background: none;">${ key }</code></td>
      <td style="border-bottom: 1px solid var(--vscode-tree-tableColumnsBorder);">${
        value === undefined       ? TdUndefined({ value }) :
        value === null            ? TdNull({ value }) :
        typeof value == "boolean" ? TdBool({ value }) :
        typeof value == "number"  ? TdNumber({ value }) :
        typeof value == "string"  ? TdString({ value }) :
        Array.isArray(value)      ? TdList({ value }) :
        valueIsDict               ? TdDict({ value }) :
        ""
      }</td>
    </tr>
    ${ valueIsDict ? Object.entries(value).map(([key, value]) => Tr({ key, value, depth: depth + 1 })).join("") : "" }
  `
}

function TdUndefined({ value }) {
  return /* html */ `<input style="text-align: center; color: var(--vscode-charts-lines); border: none; width: 100%; height: 100%; font-family: var(--vscode-editor-font-family); font-size: var(--vscode-editor-font-size); font-weight: var(--vscode-editor-font-weight); color: var(--vscode-editor-foreground); background: var(--vscode-editor-background);" type="text" value="?" readonly/>`
}

function TdNull({ value }) {
  return /* html */ `<input style="text-align: center; border: none; width: 100%; height: 100%; font-family: var(--vscode-editor-font-family); font-size: var(--vscode-editor-font-size); font-weight: var(--vscode-editor-font-weight); color: var(--vscode-charts-red); background: var(--vscode-editor-background);" type="text" value="~" readonly/>`
}

function TdNumber({ value }) {
  return /* html */ `<input style="border: none; width: 100%; height: 100%; text-align: right; font-family: var(--vscode-editor-font-family); font-size: var(--vscode-editor-font-size); font-weight: var(--vscode-editor-font-weight); color: var(--vscode-charts-green); background: var(--vscode-editor-background);" type="number" value="${ value }" readonly/>`
}

function TdString({ value }) {
  return /* html */ `<div style="min-width: 100%; min-height: 100%; font-family: var(--vscode-editor-font-family); font-size: var(--vscode-editor-font-size); font-weight: var(--vscode-editor-font-weight); color: var(--vscode-charts-orange); background: var(--vscode-editor-background); text-wrap: nowrap; white-space: preserve;" role="textbox">${ value }</div>`
}

function TdBool({ value }) {
  return /* html */ `<input style="min-width: 100%; min-height: 100%; background: var(--vscode-charts-blue);" type="checkbox" ${ value ? "checked" : "" } onclick="return false;"/>`
}

function TdList({ value }) {
  return /* html */ `<input style="text-align: center; border: none; width: 100%; height: 100%; font-family: var(--vscode-editor-font-family); font-size: var(--vscode-editor-font-size); font-weight: var(--vscode-editor-font-weight); color: var(--vscode-charts-yellow); background: var(--vscode-editor-background);" type="text" value="[]" readonly/>`
}

function TdDict({ value }) {
  return /* html */ `<input style="text-align: center; border: none; width: 100%; height: 100%; font-family: var(--vscode-editor-font-family); font-size: var(--vscode-editor-font-size); font-weight: var(--vscode-editor-font-weight); color: var(--vscode-charts-purple); background: var(--vscode-editor-background);" type="text" value="{}" readonly/>`
}
