import * as fs from "fs"
import * as vscode from "vscode"

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("todo--give-a-name-to-the-extension.helloWorld", () => {
      const panel = vscode.window.createWebviewPanel("wv-64073227", "Helm Table Visualizer", {
        viewColumn: vscode.ViewColumn.Active
      }, {
        enableScripts: true
      })

      panel.webview.html = fs.readFileSync(vscode.Uri.joinPath(context.extensionUri, "src-webview", "dist", "index.html").with({ scheme: "vscode-resource" }).fsPath, "utf8")

      context.subscriptions.push(
        panel
      )
    })
  )
}

export function deactivate() {
}
