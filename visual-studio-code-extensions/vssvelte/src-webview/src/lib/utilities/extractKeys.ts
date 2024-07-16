import isDict from "./isDict"
import Key from "./Key"

export default function extractKeys(data: Array<Record<string, any>>, parentKey = Key.root()): Record<string, Key> {
  for (const d of data) {
    for (const [i, [k, v]] of Object.entries(d).entries()) {
      const childKey = parentKey.addChild(k, i)
      if (isDict(v)) extractKeys([v], childKey)
    }
  }

  return parentKey.children
}
