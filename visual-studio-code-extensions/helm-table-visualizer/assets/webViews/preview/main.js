main()

/**
 * @param {object} vscode
 * @param {() => any} vscode.getState
 * @param {(message: any, transfer?: any) => void} vscode.postMessage
 * @param {(newState: any) => void} vscode.setState
 */
function main(vscode = acquireVsCodeApi()) {
  updateData(vscode.getState() ?? {
    file: "---",
    yaml: {}
  })

  window.addEventListener("message", ({ data }) => {
    vscode.setState(data)
    updateData(data)
  }, false)
}

function updateData(data) {
  document.body.innerHTML = /* html */ `
    <table style="width: 100%;">
      <thead style="text-align: left;">
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        ${ Object.entries(data.yaml).map(([k, v]) => /* html */ `
          <tr>
            <td>${ k }</td>
            <td>${
              v === undefined       ? /* html */ `undefined` :
              v === null            ? /* html */ `null` :
              typeof v == "number"  ? /* html */ `<input type="number" value="${ v }"/>` :
              typeof v == "string"  ? /* html */ `<textarea>${ v }</textarea>` :
              typeof v == "boolean" ? /* html */ `<input type="checkbox" ${ v ? "checked" : ""}/>` :
              Array.isArray(v)      ? /* html */ `list` :
              v instanceof Object   ? /* html */ `dict` :
              ""
            }</td>
          </tr>
        `).join("") }
      </tbody>
    </table>
  `
}
