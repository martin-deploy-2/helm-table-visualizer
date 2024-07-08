import { derived } from "svelte/store"
import { store as valuesFiles, type ValuesFile } from "./values-files"

export interface ValuesKey {
	path: Array<string>
	children: Array<ValuesKey>
}

export const store = derived(valuesFiles, (valuesFiles: Array<ValuesFile>): Array<ValuesKey> => {
	let result: Array<ValuesKey> = []

	for (let f of valuesFiles) {
		if (f.selected) {
			console.log(f.path)
			console.log(f.values)
			extractKeys(f.values, result)
		}
	}

	console.log(result)
	return result
})

function extractKeys(values: any, result: Array<ValuesKey>, path: Array<string> = []): void {
	if (values instanceof Object || Array.isArray(values)) {
		for (let k of Object.keys(values)) {
			let key = result.find(x => x.path.at(-1) == k)

			if (!key) {
				key = {
					path: [...path, k],
					children: []
				}

				result.push(key)
			}

			extractKeys(values[k], key.children, key.path)
		}
	}
}
