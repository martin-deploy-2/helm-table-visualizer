/**
 * @param {object} vscode
 * @param {() => any} vscode.getState
 * @param {(message: any, transfer?: any) => void} vscode.postMessage
 * @param {(newState: any) => void} vscode.setState
 */
function main(vscode = acquireVsCodeApi()) {
  window.addEventListener("message", e => {
    vscode.postMessage(e.data)
  }, false)
}

main()
