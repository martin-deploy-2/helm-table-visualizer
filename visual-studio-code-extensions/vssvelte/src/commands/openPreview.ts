import * as vscode from "vscode"
import * as openLockedPreview from "./openLockedPreview"

export const id = "helmTableVisualizer.commands.openPreview"

export function getCallback(context: vscode.ExtensionContext) {
  return openLockedPreview.getCallback(context)
  // return () => {
  //   //...
  // }
}
