import { writable } from "svelte/store"

export interface ValuesFile {
	selected: boolean
	path: string
	values: any
}

export const store = writable<Array<ValuesFile>>([])
