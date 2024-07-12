import * as vscode from "vscode"
import * as preview from "../webViews/preview"

export const id = "helmTableVisualizer.commands.openLockedPreview"

export function getCallback(context: vscode.ExtensionContext) {
  return () => {
    preview.createWebviewPanel(context)
  }
}
