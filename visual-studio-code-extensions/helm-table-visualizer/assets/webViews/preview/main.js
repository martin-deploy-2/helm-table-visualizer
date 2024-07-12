class Key {
  /**
   * @param {Array<string>} path
   * @param {number} order
   * @param {Record<string, Key>} children
   * @param {boolean} expanded
   */
  constructor(path, order, children = {}, expanded = true) {
    this.path = path
    this.order = order
    this.children = children
    this.expanded = expanded
  }

  /**
   * @param {Key | null | undefined} a
   * @param {Key | null | undefined} b
   *
   * @returns {boolean}
   */
  static areEqual(a, b) {
    if (a === undefined && b === undefined) return true
    if (a === null && b === null) return true
    if (!a || !b) return false
    if (a.order != b.order) return false
    if (a.path.join("\0") != b.path.join("\0")) return false

    let sck = new Set < string > ((Object.keys(a.children)))

    for (let [bck, bcv] of Object.entries(b.children)) {
      if (!sck.has(bck)) return false
      if (!Key.areEqual(a.children[bck], bcv)) return false
      sck.delete(bck)
    }

    return sck.size == 0
  }

  /**
   * Creates a {@link Key} with an empty {@link Key.path}, an {@link Key.order}
   * set to `0` and no {@link Key.children}.
   *
   * @returns {Key}
   */
  static root() {
    return new Key([], 0)
  }

  /**
   * Idempotent: if the {@link leaf} already exists in this {@link Key}'s
   * {@link Key.children}, its {@link Key.order} will be set to the highest
   * between its original {@link Key.order} and the new given {@link order}, if
   * specified.
   *
   * If the {@link leaf} does not already exists in this {@link Key}'s
   * {@link Key.children} and {@link order} is not specified, its
   * {@link Key.order} will be set to the next index in {@link Key.children}.
   *
   * @param {string} leaf
   * @param {number | undefined} order
   *
   * @returns {Key}
   */
  addChild(leaf, order = undefined) {
    const existing = this.children[leaf]
    if (existing) {
      if (order !== undefined) {
        existing.order = Math.max(existing.order, order)
      }

      return existing
    }

    return this.children[leaf] = new Key([...this.path, leaf], order ?? Object.keys(this.children).length)
  }
}

/**
 * @param {any} x
 *
 * @returns {boolean}
 */
function isDict(x) {
  return typeof x == "object" && x != null && !Array.isArray(x)
}

/**
 * @param {Array<Record<string, any>>} data
 * @param {Key} parentKey
 *
 * @returns {Record<string, Key>}
 */
function extractKeys(data, parentKey = Key.root()) {
  for (const d of data) {
    for (const [i, [k, v]] of Object.entries(d).entries()) {
      const childKey = parentKey.addChild(k, i)
      if (isDict(v)) extractKeys([v], childKey)
    }
  }

  return parentKey.children
}

main()

/**
 * @param {object} vscode
 * @param {() => any} vscode.getState
 * @param {(message: any, transfer?: any) => void} vscode.postMessage
 * @param {(newState: any) => void} vscode.setState
 */
function main(vscode = acquireVsCodeApi()) {
  updateData(vscode.getState() ?? {
    chartFolder: "(No chart)",
    chartName: "(No chart)",
    valuesFiles: []
  })

  window.addEventListener("message", ({ data }) => {
    vscode.setState(data)
    updateData(data)
  }, false)
}

function updateData(data) {
  document.body.innerHTML = Table(data)
}

function Table({ chartFolder, chartName, valuesFiles }) {
  const keys = extractKeys(valuesFiles.map(f => f.data))

  return /* html */ `
    <div>Chart folder: ${ chartFolder }</div>
    <div>Chart name: ${ chartName }</div>
    <table>
      <thead style="text-align: left;">
        <tr>
          <th style="position: sticky; top: 0; left: 0; z-index: 10; background: var(--vscode-editorStickyScrollHover-background); border-bottom: 2px solid var(--vscode-tree-tableColumnsBorder); min-width: 200px;">Keys \ Values</th>
          ${ valuesFiles.map(v => /* html */`
            <th style="position: sticky; top: 0; background: var(--vscode-editorStickyScrollHover-background); border-bottom: 2px solid var(--vscode-tree-tableColumnsBorder); min-width: 300px;">${ v.path }</th>
          `).join("") }
        </tr>
      </thead>
      <tbody>
        ${ Object.entries(keys).map(([_, key]) => Tr({ key, valuesFiles })).join("") }
      </tbody>
    </table>
  `
}

function Tr({ key, valuesFiles }) {
  const depth = key.path.length - 1
  const leaf = key.path.at(-1)

  return /* html */ `
    <tr>
      <td style="position: sticky; left: 0; background: var(--vscode-editorStickyScroll-background); border-bottom: 1px solid var(--vscode-tree-tableColumnsBorder); border-right: 1px solid var(--vscode-editorStickyScroll-shadow); padding-left: ${ depth }em; vertical-align: top;"><code style="white-space: preserve; font-family: var(--vscode-editor-font-family); font-size: var(--vscode-editor-font-size); font-weight: var(--vscode-editor-font-weight); background: none;">${ leaf }</code></td>
      ${ valuesFiles.map(v => {
        const value = dig(key.path, v.data)

        return /* html */ `
          <td style="border-bottom: 1px solid var(--vscode-tree-tableColumnsBorder); border-right: 1px solid var(--vscode-editorStickyScroll-shadow);">${
            value === undefined       ? TdUndefined({ value }) :
            value === null            ? TdNull({ value }) :
            typeof value == "boolean" ? TdBool({ value }) :
            typeof value == "number"  ? TdNumber({ value }) :
            typeof value == "string"  ? TdString({ value }) :
            Array.isArray(value)      ? TdList({ value }) :
            isDict(value)             ? TdDict({ value }) :
            ""
          }</td>
        `
      }).join("") }
    </tr>
    ${ key.expanded ? Object.entries(key.children).map(([_, childKey]) => Tr({ key: childKey, valuesFiles })).join("") : "" }
    `
}

/**
 * @param {Array<string>} keyPath
 * @param {any} data
 */
function dig(keyPath, data) {
  if (keyPath.length == 0) return data
  if (isDict(data)) return dig(keyPath.slice(1), data[keyPath[0]])

  return undefined
}

function TdUndefined({ value }) {
  return /* html */ `<input style="text-align: center; border: none; width: 100%; height: 100%; font-family: var(--vscode-editor-font-family); font-size: var(--vscode-editor-font-size); font-weight: var(--vscode-editor-font-weight); color: var(--vscode-charts-lines); background: transparent;" type="text" value="?" readonly/>`
}

function TdNull({ value }) {
  return /* html */ `<input style="text-align: center; border: none; width: 100%; height: 100%; font-family: var(--vscode-editor-font-family); font-size: var(--vscode-editor-font-size); font-weight: var(--vscode-editor-font-weight); color: var(--vscode-charts-red); background: transparent;" type="text" value="~" readonly/>`
}

function TdNumber({ value }) {
  return /* html */ `<input style="border: none; width: 100%; height: 100%; text-align: right; font-family: var(--vscode-editor-font-family); font-size: var(--vscode-editor-font-size); font-weight: var(--vscode-editor-font-weight); color: var(--vscode-charts-green); background: transparent;" type="number" value="${ value }" readonly/>`
}

function TdString({ value }) {
  return /* html */ `<div style="min-width: 100%; min-height: 100%; font-family: var(--vscode-editor-font-family); font-size: var(--vscode-editor-font-size); font-weight: var(--vscode-editor-font-weight); color: var(--vscode-charts-orange); background: transparent; text-wrap: nowrap; white-space: preserve;" role="textbox">${ value }</div>`
}

function TdBool({ value }) {
  return /* html */ `<input style="min-width: 100%; min-height: 100%; background: var(--vscode-charts-blue);" type="checkbox" ${ value ? "checked" : "" } onclick="return false;"/>`
}

function TdList({ value }) {
  return /* html */ `<input style="text-align: center; border: none; width: 100%; height: 100%; font-family: var(--vscode-editor-font-family); font-size: var(--vscode-editor-font-size); font-weight: var(--vscode-editor-font-weight); color: var(--vscode-charts-yellow); background: transparent;" type="text" value="[]" readonly/>`
}

function TdDict({ value }) {
  return /* html */ `<input style="text-align: center; border: none; width: 100%; height: 100%; font-family: var(--vscode-editor-font-family); font-size: var(--vscode-editor-font-size); font-weight: var(--vscode-editor-font-weight); color: var(--vscode-charts-purple); background: transparent;" type="text" value="{}" readonly/>`
}
