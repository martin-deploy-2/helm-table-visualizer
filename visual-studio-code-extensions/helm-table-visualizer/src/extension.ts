import * as vscode from "vscode"
import * as openLockedPreview from "./commands/openLockedPreview"
import * as openPreview from "./commands/openPreview"

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(openLockedPreview.id, openLockedPreview.getCallback(context))
  )
  context.subscriptions.push(
    vscode.commands.registerCommand(openPreview.id, openPreview.getCallback(context))
  )
}

export function deactivate() {
}
