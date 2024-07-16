export default function isDict(x: any): boolean {
  return typeof x == "object" && x != null && !Array.isArray(x)
}
