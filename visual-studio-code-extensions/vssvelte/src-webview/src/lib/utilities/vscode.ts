declare function acquireVsCodeApi(): {
 getState<T = any>(): T
 postMessage(message: any, transfer?: any): void
 setState(newState: any): void
}

const vscode = acquireVsCodeApi()

export default vscode
