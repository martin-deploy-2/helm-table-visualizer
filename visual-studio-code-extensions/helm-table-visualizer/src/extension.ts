import * as vscode from "vscode"

export function activate(context: vscode.ExtensionContext) {
  const catUris = {
    coding: vscode.Uri.joinPath(context.extensionUri, "assets", "cats", "coding.gif"),
    compiling: vscode.Uri.joinPath(context.extensionUri, "assets", "cats", "compiling.gif"),
    testing: vscode.Uri.joinPath(context.extensionUri, "assets", "cats", "testing.gif"),
  }

  context.subscriptions.push(
    vscode.commands.registerCommand("helmTableVisualizer.commands.openPreviewForChart", () => {
      const previewForChartPanel = vscode.window.createWebviewPanel(
        "helmTableVisualizer.webViews.previewForChart",
        "Helm Table Visualizer",
        {
          viewColumn: vscode.ViewColumn.Active
        },
        {
          localResourceRoots: [
            vscode.Uri.joinPath(context.extensionUri, "assets")
          ]
        }
      )

      let currentCatUri: vscode.Uri = null!

      function tick() {
        currentCatUri =
          currentCatUri == catUris.coding ? catUris.compiling :
          currentCatUri == catUris.compiling ? catUris.testing :
          catUris.coding

        previewForChartPanel.webview.html = /*html*/`
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8"/>
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
              <title>${ previewForChartPanel.title }</title>
            </head>
            <body>
              <h1>Wow Such Cat</h1>
              <img src="${ previewForChartPanel.webview.asWebviewUri(currentCatUri) }" width="300"/>
            </body>
          </html>
        `
      }

      tick()
      const interval = setInterval(tick, 1000)

      context.subscriptions.push(
        previewForChartPanel.onDidDispose(() => {
          clearInterval(interval)
        })
      )
    })
  )
}

export function deactivate() {
}
