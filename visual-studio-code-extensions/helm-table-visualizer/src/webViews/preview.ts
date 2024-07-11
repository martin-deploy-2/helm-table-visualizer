import * as vscode from "vscode"
import * as yaml from "js-yaml"

export const id = "helmTableVisualizer.webViews.preview"

export function createWebviewPanel(context: vscode.ExtensionContext): vscode.Disposable {
  const panel = vscode.window.createWebviewPanel(id, "Helm Table Visualizer", {
    viewColumn: vscode.ViewColumn.Active
  }, {
    localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, "assets")],
    enableScripts: true
  })

  panel.webview.html = /* html */ `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${panel.webview.cspSource}; script-src 'unsafe-inline' ${panel.webview.cspSource}; style-src 'unsafe-inline' ${panel.webview.cspSource};"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <script defer src="${panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "assets", "webViews", "preview", "main.js"))}"></script>
      </head>
      <body>
      </body>
    </html>
  `

  const activeTextEditor = vscode.window.activeTextEditor
  if (activeTextEditor) {
    const activeEditorWorkspacePath = vscode.workspace.getWorkspaceFolder(activeTextEditor.document.uri)?.uri.path ?? ""

    let yamlFile = activeTextEditor.document.uri.path

    if (activeEditorWorkspacePath && yamlFile.startsWith(activeEditorWorkspacePath)) {
      yamlFile = yamlFile.substring(activeEditorWorkspacePath.length)
    }

    if (yamlFile.startsWith("/")) {
      yamlFile = yamlFile.substring(1)
    }

    panel.title = yamlFile
    panel.webview.postMessage({
      yamlFile: yamlFile,
      yaml: yaml.load(activeTextEditor.document.getText(), { filename: yamlFile })
    })

    context.subscriptions.push(
      vscode.workspace.onDidChangeTextDocument(e => {
        if (e.document != activeTextEditor.document) {
          return
        }

        panel.title = yamlFile
        panel.webview.postMessage({
          yamlFile: yamlFile,
          yaml: yaml.load(activeTextEditor.document.getText(), { filename: yamlFile })
        })
      })
    )
  }

  context.subscriptions.push(
    panel.webview.onDidReceiveMessage(m => {
      // ...
    })
  )

  context.subscriptions.push(
    panel.onDidDispose(() => {
      // ...
    })
  )

  return panel
}
