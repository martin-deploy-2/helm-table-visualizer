import { extractKeys, Key } from "./index.ts"

console.log(new Date)

testThat(() => Key.areEqual(undefined, undefined))
testThat(() => !Key.areEqual(undefined, null))
testThat(() => !Key.areEqual(undefined, Key.root()))

testThat(() => !Key.areEqual(null, undefined))
testThat(() => Key.areEqual(null, null))
testThat(() => !Key.areEqual(null, Key.root()))

testThat(() => !Key.areEqual(Key.root(), undefined))
testThat(() => !Key.areEqual(Key.root(), null))
testThat(() => Key.areEqual(Key.root(), Key.root()))

testThat(() => !Key.areEqual(new Key([], 0), new Key([], 1)))
testThat(() => Key.areEqual(new Key([], 1), new Key([], 1)))
testThat(() => !Key.areEqual(new Key(["a"], 0), new Key(["b"], 0)))
testThat(() => Key.areEqual(new Key(["b"], 0), new Key(["b"], 0)))
testThat(() => !Key.areEqual(new Key(["a", "b", "c"], 0), new Key(["a", "b", "d"], 0)))
testThat(() => Key.areEqual(new Key(["a", "b", "d"], 0), new Key(["a", "b", "d"], 0)))
testThat(() => !Key.areEqual(new Key(["a"], 0, { "b": new Key(["a", "b"], 0) }), new Key(["a"], 0, { "c": new Key(["a", "c"], 0) })))
testThat(() => Key.areEqual(new Key(["a"], 0, { "c": new Key(["a", "c"], 0) }), new Key(["a"], 0, { "c": new Key(["a", "c"], 0) })))
testThat(() => !Key.areEqual(new Key(["a"], 0, { "b": new Key(["a", "b"], 0, { "c": new Key(["a", "b", "c"], 0) }) }), new Key(["a"], 0, { "b": new Key(["a", "b"], 0, { "d": new Key(["a", "b", "d"], 0) }) })))
testThat(() => Key.areEqual(new Key(["a"], 0, { "b": new Key(["a", "b"], 0, { "d": new Key(["a", "b", "d"], 0) }) }), new Key(["a"], 0, { "b": new Key(["a", "b"], 0, { "d": new Key(["a", "b", "d"], 0) }) })))

testThat(() => Key.root().addChild("a").order == 0)
testThat(() => Key.root().addChild("a", 10).order == 10)
testThat(() => Key.root().addChild("a", 10).addChild("b").order == 0)

testThat((k: Key = Key.root()) => k.addChild("a").order == 0 && k.addChild("b").order == 1)
testThat((k: Key = Key.root()) => k.addChild("a", 10).order == 10 && k.addChild("b").order == 1)
testThat((k: Key = Key.root()) => k.addChild("a", 10).order == 10 && k.addChild("a").order == 10)
testThat((k: Key = Key.root()) => k.addChild("a", 10).order == 10 && k.addChild("a", 5).order == 10)
testThat((k: Key = Key.root()) => k.addChild("a", 10).order == 10 && k.addChild("a", 20).order == 20)

testThat((k: Key = Key.root()) => k.addChild("a").path.join(".") == "a")
testThat((k: Key = Key.root()) => k.addChild("a").addChild("b").path.join(".") == "a.b")
testThat((k: Key = Key.root()) => k.addChild("a").addChild("b").addChild("c").path.join(".") == "a.b.c")

testExtractKeys("Empty", {
  given: [],
  expected: {}
})

testExtractKeys("Single dict, no depth", {
  given: [
    {
      nul1: null,
      boo1: true,
      boo2: false,
      num1: 42,
      num2: 0,
      str1: "",
      str2: "coucou",
      lis1: [1, 2, 3],
    }
  ],
  expected: {
    nul1: new Key(["nul1"], 0),
    boo1: new Key(["boo1"], 1),
    boo2: new Key(["boo2"], 2),
    num1: new Key(["num1"], 3),
    num2: new Key(["num2"], 4),
    str1: new Key(["str1"], 5),
    str2: new Key(["str2"], 6),
    lis1: new Key(["lis1"], 7),
  }
})

testExtractKeys("Single dict, nested depth", {
  given: [
    {
      nul1: null,
      boo1: true,
      boo2: false,
      num1: 42,
      dic1: {
        num2: 0,
        str1: "",
        str2: "coucou",
        lis1: [1, 2, 3],
      }
    }
  ],
  expected: {
    nul1: new Key(["nul1"], 0),
    boo1: new Key(["boo1"], 1),
    boo2: new Key(["boo2"], 2),
    num1: new Key(["num1"], 3),
    dic1: new Key(["dic1"], 4, {
      num2: new Key(["dic1", "num2"], 0),
      str1: new Key(["dic1", "str1"], 1),
      str2: new Key(["dic1", "str2"], 2),
      lis1: new Key(["dic1", "lis1"], 3),
    }),
  }
})

testExtractKeys("Single dict, recursive depth", {
  given: [
    {
      nul1: null,
      boo1: true,
      dic1: {
        boo2: false,
        num1: 42,
        dic2: {
          num2: 0,
          str1: "",
          dic3: {
            str2: "coucou",
            lis1: [1, 2, 3],
          },
        },
      },
    }
  ],
  expected: {
    nul1: new Key(["nul1"], 0),
    boo1: new Key(["boo1"], 1),
    dic1: new Key(["dic1"], 2, {
      boo2: new Key(["dic1", "boo2"], 0),
      num1: new Key(["dic1", "num1"], 1),
      dic2: new Key(["dic1", "dic2"], 2, {
        num2: new Key(["dic1", "dic2", "num2"], 0),
        str1: new Key(["dic1", "dic2", "str1"], 1),
        dic3: new Key(["dic1", "dic2", "dic3"], 2, {
          str2: new Key(["dic1", "dic2", "dic3", "str2"], 0),
          lis1: new Key(["dic1", "dic2", "dic3", "lis1"], 1),
        }),
      }),
    }),
  }
})

testExtractKeys("Multiple dicts, no overlap, no depth", {
  given: [
    {
      nul1: null,
      boo1: true,
      boo2: false,
      num1: 42,
    },
    {
      num2: 0,
      str1: "",
      str2: "coucou",
      lis1: [1, 2, 3],
    }
  ],
  expected: {
    nul1: new Key(["nul1"], 0),
    boo1: new Key(["boo1"], 1),
    boo2: new Key(["boo2"], 2),
    num1: new Key(["num1"], 3),
    num2: new Key(["num2"], 0),
    str1: new Key(["str1"], 1),
    str2: new Key(["str2"], 2),
    lis1: new Key(["lis1"], 3),
  }
})

testExtractKeys("Multiple dicts, no overlap, nested depth", {
  given: [
    {
      nul1: null,
      boo1: true,
      dic1: {
        boo2: false,
        num1: 42,
      },
    },
    {
      num2: 0,
      str1: "",
      dic2: {
        str2: "coucou",
        lis1: [1, 2, 3],
      },
    }
  ],
  expected: {
    nul1: new Key(["nul1"], 0),
    boo1: new Key(["boo1"], 1),
    dic1: new Key(["dic1"], 2, {
      boo2: new Key(["dic1", "boo2"], 0),
      num1: new Key(["dic1", "num1"], 1),
    }),
    num2: new Key(["num2"], 0),
    str1: new Key(["str1"], 1),
    dic2: new Key(["dic2"], 2, {
      str2: new Key(["dic2", "str2"], 0),
      lis1: new Key(["dic2", "lis1"], 1),
    }),
  }
})

testExtractKeys("Multiple dicts, no overlap, recursive depth", {
  given: [
    {
      nul1: null,
      dic1: {
        boo1: true,
        dic2: {
          boo2: false,
          dic3: {
            num1: 42,
          },
        },
      },
    },
    {
      num2: 0,
      dic4: {
        str1: "",
        dic5: {
          str2: "coucou",
          dic6: {
            lis1: [1, 2, 3],
          },
        },
      },
    }
  ],
  expected: {
    nul1: new Key(["nul1"], 0),
    dic1: new Key(["dic1"], 1, {
      boo1: new Key(["dic1", "boo1"], 0),
      dic2: new Key(["dic1", "dic2"], 1, {
        boo2: new Key(["dic1", "dic2", "boo2"], 0),
        dic3: new Key(["dic1", "dic2", "dic3"], 1, {
          num1: new Key(["dic1", "dic2", "dic3", "num1"], 0),
        }),
      }),
    }),
    num2: new Key(["num2"], 0),
    dic4: new Key(["dic4"], 1, {
      str1: new Key(["dic4", "str1"], 0),
      dic5: new Key(["dic4", "dic5"], 1, {
        str2: new Key(["dic4", "dic5", "str2"], 0),
        dic6: new Key(["dic4", "dic5", "dic6"], 1, {
          lis1: new Key(["dic4", "dic5", "dic6", "lis1"], 0),
        }),
      }),
    }),
  }
})

testExtractKeys("Multiple dicts, overlap, no depth", {
  given: [
    {
      nul1: null,
      boo1: true,
      boo2: false,
      num1: 42,
      num2: 0,
      str1: "",
    },
    {
      boo2: false,
      num1: 42,
      num2: 0,
      str1: "",
      str2: "coucou",
      lis1: [1, 2, 3],
    }
  ],
  expected: {
    nul1: new Key(["nul1"], 0),
    boo1: new Key(["boo1"], 1),
    boo2: new Key(["boo2"], 2),
    num1: new Key(["num1"], 3),
    num2: new Key(["num2"], 4),
    str1: new Key(["str1"], 5),
    str2: new Key(["str2"], 4),
    lis1: new Key(["lis1"], 5),
  }
})

testExtractKeys("Multiple dicts, overlap, nested depth", {
  given: [
    {
      nul1: null,
      dic1: {
        boo1: true,
        boo2: false,
        num1: 42,
        num2: 0,
      },
      str1: "",
    },
    {
      boo2: false,
      dic1: {
        num1: 42,
        num2: 0,
        str1: "",
        str2: "coucou",
      },
      lis1: [1, 2, 3],
    }
  ],
  expected: {
    nul1: new Key(["nul1"], 0),
    str1: new Key(["str1"], 2),
    boo2: new Key(["boo2"], 0),
    dic1: new Key(["dic1"], 1, {
      boo1: new Key(["dic1", "boo1"], 0),
      boo2: new Key(["dic1", "boo2"], 1),
      num1: new Key(["dic1", "num1"], 2),
      num2: new Key(["dic1", "num2"], 3),
      str1: new Key(["dic1", "str1"], 2),
      str2: new Key(["dic1", "str2"], 3),
    }),
    lis1: new Key(["lis1"], 2),
  }
})

testExtractKeys("Multiple dicts, overlap, recursive depth", {
  given: [
    {
      nul1: null,
      dic1: {
        boo1: true,
        dic2: {
          boo2: false,
          num1: 42,
        },
        num2: 0,
      },
      str1: "",
    },
    {
      boo2: false,
      dic1: {
        dic2: {
          num1: 42,
          num2: 0,
        },
        str1: "",
        str2: "coucou",
      },
      lis1: [1, 2, 3],
    }
  ],
  expected: {
    nul1: new Key(["nul1"], 0),
    boo2: new Key(["boo2"], 0),
    dic1: new Key(["dic1"], 1, {
      boo1: new Key(["dic1", "boo1"], 0),
      dic2: new Key(["dic1", "dic2"], 1, {
        boo2: new Key(["dic1", "dic2", "boo2"], 0),
        num1: new Key(["dic1", "dic2", "num1"], 1),
        num2: new Key(["dic1", "dic2", "num2"], 1),
      }),
      num2: new Key(["dic1", "num2"], 2),
      str1: new Key(["dic1", "str1"], 1),
      str2: new Key(["dic1", "str2"], 2),
    }),
    str1: new Key(["str1"], 2),
    lis1: new Key(["lis1"], 2),
  }
})

function testThat(predicate: (..._: Array<any>) => boolean) {
  try {
    if (predicate()) logSuccess(predicate.toString())
    else logAssertionFailure(predicate.toString(), true, false)
  } catch (error) {
    logException(predicate.toString(), error)
  }
}

function logSuccess(name: string) {
  console.log("PASS", name)
}

function logAssertionFailure(name: string, expected: any, actual: any) {
  console.group("FAIL", name)
  console.log("Expected", expected)
  console.log("Actual", actual)
  console.groupEnd()
}

function logException(name: string, error: any) {
  console.group("FAIL", name)
  console.log("Error", error)
  console.groupEnd()
}

function testExtractKeys(name: string, o: { given: Array<Record<string, any>>, expected: Record<string, Key> }) {
  let actual = extractKeys(o.given)

  if (Key.areEqual(new Key([], 0, actual), new Key([], 0, o.expected))) {
    logSuccess(name)
  } else {
    let a = JSON_sortedStringify(actual, 2)
    let e = JSON_sortedStringify(o.expected, 2)
    logAssertionFailure(name, e, a)
  }
}

// https://stackoverflow.com/a/53593328
function JSON_sortedStringify(obj: Record<string, any>, space: number) {
  const allKeys = new Set<string>()
  JSON.stringify(obj, (key, value) => (allKeys.add(key), value))
  return JSON.stringify(obj, Array.from(allKeys).sort(), space)
}
