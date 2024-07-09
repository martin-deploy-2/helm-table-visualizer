import * as vscode from "vscode"

export const id = "helmTableVisualizer.webViews.preview"

export function createWebviewPanel(context: vscode.ExtensionContext): vscode.Disposable {
  const previewPanel = vscode.window.createWebviewPanel(
    id,
    "Helm Table Visualizer",
    {
      viewColumn: vscode.ViewColumn.Active
    },
    {
      localResourceRoots: [
        vscode.Uri.joinPath(context.extensionUri, "assets")
      ],
      enableScripts: true
    }
  )

  previewPanel.webview.html = /* html */ `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${previewPanel.webview.cspSource}; script-src 'unsafe-inline' ${previewPanel.webview.cspSource}; style-src 'unsafe-inline' ${previewPanel.webview.cspSource};"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>${previewPanel.title}</title>
        <script defer src="${previewPanel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "assets", "webViews", "preview", "main.js"))}"></script>
      </head>
      <body>
      </body>
    </html>
  `

  context.subscriptions.push(
    previewPanel.onDidDispose(() => {
      // ...
    })
  )

  return previewPanel
}
