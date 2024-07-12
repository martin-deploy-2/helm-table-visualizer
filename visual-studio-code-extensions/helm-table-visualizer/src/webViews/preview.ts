import * as vscode from "vscode"
import * as yaml from "js-yaml"

export const id = "helmTableVisualizer.webViews.preview"

export function createWebviewPanel(context: vscode.ExtensionContext) {
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
    const activeDocument = activeTextEditor.document
    const activeDocumentWorkspaceFolderPath = vscode.workspace.getWorkspaceFolder(activeDocument.uri)?.uri.path ?? ""

    let promiseOfChart = findChartFolderUriAsync(vscode.Uri.joinPath(activeDocument.uri, ".."))
    let promiseOfYamlDocuments = promiseOfChart.then(chart => {
      if (chart == null) {
        return Promise.resolve([activeDocument])
      }

      let promiseOfValuesYamlUris = vscode.workspace.findFiles(new vscode.RelativePattern(chart, "values{*,/**/*}.yaml"))
      let promiseOfValuesYamlDocuments = promiseOfValuesYamlUris.then(valuesYaml => {
        return Promise.all(
          valuesYaml.map(vscode.workspace.openTextDocument)
        )
      })

      return promiseOfValuesYamlDocuments
    })

    function pathOf(p: string): string {
      if (p.startsWith(activeDocumentWorkspaceFolderPath)) {
        p = p.substring(activeDocumentWorkspaceFolderPath.length)
      }

      if (p.startsWith("/")) {
        p = p.substring(1)
      }

      return p
    }

    Promise.all([promiseOfChart, promiseOfYamlDocuments]).then(([chartUri, yamlDocuments]) => {
      function up() {
        const m = {
          chartFolder: pathOf(chartUri?.path ?? "(No chart)"),
          chartName: chartUri?.path.split("/").at(-1) ?? "(No chart)",
          valuesFiles: yamlDocuments.map(v => ({
            path: pathOf(v.uri.path),
            data: yaml.load(v.getText(), { filename: v.uri.path }) ?? {}
          }))
        }

        panel.title = m.chartFolder ?? pathOf(activeDocument.uri.path)
        panel.webview.postMessage(m)
      }

      up()

      context.subscriptions.push(
        vscode.workspace.onDidChangeTextDocument(e => {
          if (yamlDocuments.indexOf(e.document) == -1) {
            return
          }

          up()
        })
      )
    })

    Promise.all([promiseOfChart, promiseOfYamlDocuments]).catch(error => {
      vscode.window.showErrorMessage(JSON.stringify(error, undefined, 2))
    })
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

  context.subscriptions.push(
    panel
  )
}

function findChartFolderUriAsync(folder: vscode.Uri): PromiseLike<vscode.Uri | null> {
  let promiseOfChartYaml = vscode.workspace.findFiles(new vscode.RelativePattern(folder, "Chart.yaml"))
  let promiseOfChartFolder = promiseOfChartYaml.then(chartYaml => {
    if (chartYaml.length) {
      return folder
    }

    const parentFolder = vscode.Uri.joinPath(folder, "..")

    if (parentFolder.toString() == folder.toString()) {
      return null
    }

    return findChartFolderUriAsync(parentFolder)
  })

  return promiseOfChartFolder
}
