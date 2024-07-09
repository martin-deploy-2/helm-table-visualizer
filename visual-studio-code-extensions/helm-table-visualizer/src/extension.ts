import * as vscode from "vscode"

export function activate(context: vscode.ExtensionContext) {
  let previewForChartPanel: vscode.WebviewPanel | null = null

  context.subscriptions.push(
    vscode.commands.registerCommand("helmTableVisualizer.commands.openPreview", () => {
      if (previewForChartPanel) {
        previewForChartPanel.reveal()
        return
      }

      previewForChartPanel = vscode.window.createWebviewPanel(
        "helmTableVisualizer.webViews.preview",
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

      previewForChartPanel.webview.html = /* html */ `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8"/>
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${ previewForChartPanel.webview.cspSource}; script-src 'unsafe-inline' ${previewForChartPanel.webview.cspSource}; style-src 'unsafe-inline' ${previewForChartPanel.webview.cspSource };"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>${ previewForChartPanel.title }</title>
          </head>
          <body>
            <h1 id="codeCount"></h1>
            <img id="catImg" src="" width="300"/>
            <script>
              ;(() => {
                const vscode = acquireVsCodeApi()

                const codeCount = document.getElementById("codeCount")
                const catImg = document.getElementById("catImg")

                const catUris = {
                  coding: "${ previewForChartPanel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "assets", "cats", "coding.gif"))}",
                  compiling: "${previewForChartPanel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "assets", "cats", "compiling.gif"))}",
                  testing: "${previewForChartPanel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "assets", "cats", "testing.gif")) }",
                }

                let i = 0

                function code() {
                  ++i
                  codeCount.textContent = i.toString()
                }

                let currentCatUri = null

                function tick() {
                  currentCatUri =
                    currentCatUri == catUris.coding ? catUris.compiling :
                    currentCatUri == catUris.compiling ? catUris.testing :
                    catUris.coding
                  catImg.src = currentCatUri

                  vscode.postMessage("WOW")
                }

                code()
                setInterval(code, 200)

                tick()
                setInterval(tick, 1000)

                window.addEventListener("message", e => {
                  if (e.data == "REFACTOR") {
                    i = Math.ceil(i / 2)
                  }
                }, false)
              })();
            </script>
          </body>
        </html>
      `

      context.subscriptions.push(
        previewForChartPanel.webview.onDidReceiveMessage(m => {
          if (m == "WOW") {
            vscode.window.showInformationMessage("Wow...")
          }
        })
      )

      context.subscriptions.push(
        previewForChartPanel.onDidDispose(() => {
        })
      )
    })
  )
  context.subscriptions.push(
    vscode.commands.registerCommand("helmTableVisualizer.commands.openLockedPreview", () => {
      if (!previewForChartPanel) {
        return
      }

      previewForChartPanel.webview.postMessage("REFACTOR")
    })
  )
}

export function deactivate() {
}
