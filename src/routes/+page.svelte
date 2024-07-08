<script lang="ts">
	import { browser } from "$app/environment"
	import { onMount, type ComponentProps } from "svelte"

	import "bootstrap/dist/css/bootstrap.css"
	import "bootstrap-icons/font/bootstrap-icons.css"

	import Main from "../lib/components/Main.svelte"
	import { valuesSourceFromDefaultValuesYaml, valuesSourceFromOverlayValuesYaml, valuesSourceFromSubChartDefaultValuesYaml, valuesSourceFromSubChartValuesSchemaJson, valuesSourceFromValuesSchemaJson, type ExternalInteractor } from "$lib/data/model"

	onMount(async () => {
		if (browser) {
			const _bootstrap = await import("bootstrap")
		}
	})

	let keys: Array<ComponentProps<Key>> = [
		{
			path: ["exampleDict"],
			values: [
				{ type: ValType.DICT, value: {}, isFromFallback: false },
				{ type: ValType.DICT, value: {}, isFromFallback: true },
			],
			children: [
				{
					path: ["exampleDict", "exampleUndefined"],
					values: [
						{ type: ValType.UNDEFINED, value: undefined, isFromFallback: false },
						{ type: ValType.UNDEFINED, value: undefined, isFromFallback: true },
					],
				},
				{
					path: ["exampleDict", "exampleNull"],
					values: [
						{ type: ValType.NULL, value: null, isFromFallback: false },
						{ type: ValType.NULL, value: null, isFromFallback: true },
					],
				},
				{
					path: ["exampleDict", "exampleBool"],
					values: [
						{ type: ValType.BOOL, value: true, isFromFallback: false },
						{ type: ValType.BOOL, value: true, isFromFallback: true },
					],
				},
				{
					path: ["exampleDict", "exampleNumber"],
					values: [
						{ type: ValType.NUMBER, value: 300, isFromFallback: false },
						{ type: ValType.NUMBER, value: 300, isFromFallback: true },
					],
				},
				{
					path: ["exampleDict", "exampleString_plain"],
					values: [
						{ type: ValType.STRING_PLAIN, value: "Plain", isFromFallback: false },
						{ type: ValType.STRING_PLAIN, value: "Plain", isFromFallback: true },
					],
				},
				{
					path: ["exampleDict", "exampleString_single"],
					values: [
						{ type: ValType.STRING_SINGLE, value: "Single", isFromFallback: false },
						{ type: ValType.STRING_SINGLE, value: "Single", isFromFallback: true },
					],
				},
				{
					path: ["exampleDict", "exampleString_double"],
					values: [
						{ type: ValType.STRING_DOUBLE, value: "Double", isFromFallback: false },
						{ type: ValType.STRING_DOUBLE, value: "Double", isFromFallback: true },
					],
				},
				{
					path: ["exampleDict", "exampleString_pipe"],
					values: [
						{ type: ValType.STRING_PIPE, value: "Pipe", isFromFallback: false },
						{ type: ValType.STRING_PIPE, value: "Pipe", isFromFallback: true },
					],
				},
				{
					path: ["exampleDict", "exampleString_pipedash"],
					values: [
						{ type: ValType.STRING_PIPE_DASH, value: "PipeDash", isFromFallback: false },
						{ type: ValType.STRING_PIPE_DASH, value: "PipeDash", isFromFallback: true },
					],
				},
				{
					path: ["exampleDict", "exampleString_pipeplus"],
					values: [
						{ type: ValType.STRING_PIPE_PLUS, value: "PipePlus", isFromFallback: false },
						{ type: ValType.STRING_PIPE_PLUS, value: "PipePlus", isFromFallback: true },
					],
				},
				{
					path: ["exampleDict", "exampleString_chevron"],
					values: [
						{ type: ValType.STRING_CHEVRON, value: "Chevron", isFromFallback: false },
						{ type: ValType.STRING_CHEVRON, value: "Chevron", isFromFallback: true },
					],
				},
				{
					path: ["exampleDict", "exampleString_chevrondash"],
					values: [
						{ type: ValType.STRING_CHEVRON_DASH, value: "ChevronDash", isFromFallback: false },
						{ type: ValType.STRING_CHEVRON_DASH, value: "ChevronDash", isFromFallback: true },
					],
				},
				{
					path: ["exampleDict", "exampleString_chevronplus"],
					values: [
						{ type: ValType.STRING_CHEVRON_PLUS, value: "ChevronPlus", isFromFallback: false },
						{ type: ValType.STRING_CHEVRON_PLUS, value: "ChevronPlus", isFromFallback: true },
					],
				},
				{
					path: ["exampleDict", "exampleList"],
					values: [
						{ type: ValType.LIST, value: [], isFromFallback: false },
						{ type: ValType.LIST, value: [], isFromFallback: true },
					],
				},
			]
		}
	]

	let model: ExternalInteractor = null!

	model.addDependency("front-end", "simple-deploy")
	model.addDependency("back-end", "simple-deploy")
	model.addDependency("proxy", "proxymity")
	model.addDependency("netpols", "packet-guardian")

	model.setValues(valuesSourceFromSubChartValuesSchemaJson("simple-deploy"), {})
	model.setValues(valuesSourceFromSubChartValuesSchemaJson("proxymity"), {})
	model.setValues(valuesSourceFromSubChartValuesSchemaJson("packet-guardian"), {})

	model.setValues(valuesSourceFromSubChartDefaultValuesYaml("simple-deploy"), {})
	model.setValues(valuesSourceFromSubChartDefaultValuesYaml("proxymity"), {})
	model.setValues(valuesSourceFromSubChartDefaultValuesYaml("packet-guardian"), {})

	model.setValues(valuesSourceFromValuesSchemaJson(), {})

	model.setValues(valuesSourceFromDefaultValuesYaml(), {})

	model.setValues(valuesSourceFromOverlayValuesYaml("values/eu/all.yaml"), {})
	model.setValues(valuesSourceFromOverlayValuesYaml("values/eu/dev.yaml"), {})
	model.setValues(valuesSourceFromOverlayValuesYaml("values/eu/qa.yaml"), {})
	model.setValues(valuesSourceFromOverlayValuesYaml("values/eu/prod/all.yaml"), {})
	model.setValues(valuesSourceFromOverlayValuesYaml("values/eu/prod/a.yaml"), {})
	model.setValues(valuesSourceFromOverlayValuesYaml("values/eu/prod/b.yaml"), {})
	model.setValues(valuesSourceFromOverlayValuesYaml("values/us/all.yaml"), {})
	model.setValues(valuesSourceFromOverlayValuesYaml("values/us/qa.yaml"), {})
	model.setValues(valuesSourceFromOverlayValuesYaml("values/us/prod.yaml"), {})
</script>

<Main/>
