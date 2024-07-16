import isDict from "./isDict"

export default function dig(keyPath: Array<string>, data: any): any {
  if (keyPath.length == 0) return data
  if (isDict(data)) return dig(keyPath.slice(1), data[keyPath[0]])

  return undefined
}
