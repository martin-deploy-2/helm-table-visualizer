/** Opaque type. */
export interface ValuesSource {}

export function valuesSourceFromSubChartValuesSchemaJson(subChartName: string): ValuesSource {
	return ["1", subChartName]
}

export function valuesSourceFromSubChartDefaultValuesYaml(subChartName: string): ValuesSource {
	return ["2", subChartName]
}

export function valuesSourceFromValuesSchemaJson(): ValuesSource {
	return ["3"]
}

export function valuesSourceFromDefaultValuesYaml(): ValuesSource {
	return ["4"]
}

export function valuesSourceFromOverlayValuesYaml(path: string): ValuesSource {
	return ["5", path]
}

export interface ExternalInteractor {
	setApiVersion(apiVersion: "v1" | "v2"): void
	setType(type: "application" | "library" | null): void
	setName(name: string): void

	addDependency(alias: string, subChartName: string): void
	renameDependency(oldAlias: string, newAlias: string): void
	setDependency(alias: string, newSubChartName: string): void
	removeDependency(alias: string): void

	setValues(source: ValuesSource, values: Record<string, any>): void
	editValuesKey(source: ValuesSource, keyPath: Array<string>, newValue: any): void
	removeValuesKey(source: ValuesSource, keyPath: Array<string>): void
	removeValues(source: ValuesSource): void

	renameOverlayValuesYaml(oldPath: string, newPath: string): void
	moveOverlayValuesYaml(path: string, newIndex: number): void
	enableOverlayValuesYaml(path: string): void
	disableOverlayValuesYaml(path: string): void

	onValueEdited(callback: (source: ValuesSource, keyPath: ReadonlyArray<string>, newValue: any) => void): Disposable
}

export interface InternalInteractor {
	readonly apiVersion: string
	readonly type: string | null
	readonly name: string

	readonly dependencies: ReadonlyArray<{
		readonly alias: string
		readonly subChartName: string
	}>

	readonly valuesSources: ReadonlyArray<ValuesSource>
	readonly keyPaths: ReadonlyArray<ReadonlyArray<string>>

	getValue(source: ValuesSource, keyPath: ReadonlyArray<string>): {
		readonly type: ValuesType
		readonly value: any
		readonly isFromFallback: boolean
	}

	setValue(source: ValuesSource, keyPath: ReadonlyArray<string>, newValue: any): void
}

export enum ValuesType {
	UNDEFINED,
	NULL,
	BOOL,
	NUMBER,
	STRING_PLAIN,
	STRING_SINGLE,
	STRING_DOUBLE,
	STRING_PIPE,
	STRING_PIPE_DASH,
	STRING_PIPE_PLUS,
	STRING_CHEVRON,
	STRING_CHEVRON_DASH,
	STRING_CHEVRON_PLUS,
	LIST,
	DICT,
}

export function createModel(): [ExternalInteractor, InternalInteractor] {
	return [null, null] as any
}
