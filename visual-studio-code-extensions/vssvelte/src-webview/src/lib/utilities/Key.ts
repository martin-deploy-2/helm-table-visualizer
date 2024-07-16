export default class Key {
  constructor(
    public path: Array<string>,
    public order: number,
    public children: Record<string, Key> = {},
    public expanded: boolean = true,
  ) {
  }

  static areEqual(a: Key | null | undefined, b: Key | null | undefined): boolean {
    if (a === undefined && b === undefined) return true
    if (a === null && b === null) return true
    if (!a || !b) return false
    if (a.order != b.order) return false
    if (a.path.join("\0") != b.path.join("\0")) return false

    let sck = new Set<string>((Object.keys(a.children)))

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
   */
  static root(): Key {
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
   */
  addChild(leaf: string, order: number | undefined = undefined): Key {
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
