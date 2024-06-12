import { writable } from "svelte/store"

export interface Chart {
	name: string
}

export const store = writable<Chart>(undefined)
