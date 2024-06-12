<script lang="ts">
	import { store as chart } from "$lib/stores/chart"
	import { store as valuesFiles } from "$lib/stores/values-files"
	import Sidebar from "./Sidebar.svelte"
	import Table from "./Table.svelte"

	let textDocuments = new Map<string, Record<string, any>>([
		["values.yaml", {
			frontEnd: {
				image: {
					registry: "docker.io",
					repository: "alpine/alpine",
					tag: "3.18.42"
				}
			}
		}],
		["values/asia/all.yaml", {}],
		["values/asia/preprod.yaml", {}],
		["values/asia/prod.yaml", {}],
		["values/eu/all.yaml", {
			frontEnd: {
				image: {
					registry: "private.net/mirror/docker.io",
				},
				javaOpts: [
					"-Da=1",
					"-Db=2",
					"-Dc=3",
				]
			}
		}],
		["values/eu/dev.yaml", {
			frontEnd: {
				image: {
					tag: "3.18.42-debug"
				}
			}
		}],
		["values/eu/preprod.yaml", {}],
		["values/eu/prod.yaml", {}],
	])

	function init() {
		chart.set({
			name: "demo-chart"
		})
		valuesFiles.set(Array.from(textDocuments.entries()).map(([f, x]) => ({
			selected: Object.keys(x).length != 0,
			path: f,
			values: x
		})))
	}
</script>

<button on:click={init}>Init</button>

<Sidebar/>
<Table/>
