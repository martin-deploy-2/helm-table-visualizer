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
    <h1>${ yamlFile }</h1>
    <table style="width: 100%;">
      <thead style="text-align: left;">
        <tr>
          <th>Key</th>
          <th>Value</th>
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
      <td style="padding-left: ${ depth }em;"><code style="white-space: preserve;">${ key }</code></td>
      <td>${
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
  return /* html */ `undefined`
}

function TdNull({ value }) {
  return /* html */ `null`
}

function TdNumber({ value }) {
  return /* html */ `<input type="number" value="${ value }"/>`
}

function TdString({ value }) {
  return /* html */ `<textarea>${ value }</textarea>`
}

function TdBool({ value }) {
  return /* html */ `<input type="checkbox" ${ value ? "checked" : "" }/>`
}

function TdList({ value }) {
  return /* html */ `list`
}

function TdDict({ value }) {
  return /* html */ `dict`
}
