import * as vscode from "vscode"

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("todo--give-a-name-to-the-extension.helloWorld", () => {
      const panel = vscode.window.createWebviewPanel("wv-64073227", "Helm Table Visualizer", {
        viewColumn: vscode.ViewColumn.Active
      }, {
        enableScripts: true
      })

      panel.webview.html = /* html */ `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          </head>
          <body>
            <h1>Hibou</h1>
          </body>
        </html>
      `

      context.subscriptions.push(
        panel
      )
    })
  )
}

export function deactivate() {
}
