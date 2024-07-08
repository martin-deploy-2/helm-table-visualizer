import * as vscode from "vscode"

export function activate(context: vscode.ExtensionContext) {
  console.log("Congratulations, your extension helm-table-visualizer is now active!")

  context.subscriptions.push(
    vscode.commands.registerCommand("helm-table-visualizer.helloWorld", () => {
      vscode.window.showInformationMessage("Hello World from helm-table-visualizer!")
    })
  )
}

export function deactivate() {
}
