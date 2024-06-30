<script lang="ts">
	enum ChartValueDataTypes {
		UNDEFINED           = "undefined",
		NULL                = "null",
		BOOL                = "bool",
		NUMBER              = "number",
		STRING_PLAIN        = "string-plain",
		STRING_DOUBLE       = "string-double",
		STRING_SINGLE       = "string-single",
		STRING_PIPE         = "string-pipe",
		STRING_PIPE_DASH    = "string-pipe-dash",
		STRING_PIPE_PLUS    = "string-pipe-plus",
		STRING_CHEVRON      = "string-chevron",
		STRING_CHEVRON_DASH = "string-chevron-dash",
		STRING_CHEVRON_PLUS = "string-chevron-plus",
		LIST                = "list",
		DICT                = "dict",
	}

	export let dataType = ChartValueDataTypes.UNDEFINED

	const dataTypes: Record<ChartValueDataTypes, string> = {
		[ChartValueDataTypes.UNDEFINED]:           "Undefined",
		[ChartValueDataTypes.NULL]:                "Null",
		[ChartValueDataTypes.BOOL]:                "Boolean",
		[ChartValueDataTypes.NUMBER]:              "Number",
		[ChartValueDataTypes.STRING_PLAIN]:        "String (no quotes)",
		[ChartValueDataTypes.STRING_DOUBLE]:       "String (double quotes)",
		[ChartValueDataTypes.STRING_SINGLE]:       "String (single quotes)",
		[ChartValueDataTypes.STRING_PIPE]:         "String (literal clip)",
		[ChartValueDataTypes.STRING_PIPE_DASH]:    "String (literal strip)",
		[ChartValueDataTypes.STRING_PIPE_PLUS]:    "String (literal keep)",
		[ChartValueDataTypes.STRING_CHEVRON]:      "String (folded clip)",
		[ChartValueDataTypes.STRING_CHEVRON_DASH]: "String (folded strip)",
		[ChartValueDataTypes.STRING_CHEVRON_PLUS]: "String (folded keep)",
		[ChartValueDataTypes.LIST]:                "List",
		[ChartValueDataTypes.DICT]:                "Dict",
	}

	function Record_entries<K extends keyof any, V>(r: Record<K, V>): Array<[K, V]> {
		return Object.entries(r) as Array<[K, V]>
	}
</script>


<div class="DataTypeSelector">
	<details open>
		<summary>S</summary>

		{#each Record_entries(dataTypes) as [id, label]}
			<button class="DataTypeSelector-item _data-{id} {id == dataType ? "_current" : ""}" on:click={() => dataType = id}>
				<i class="DataTypeSelector-icon icon-data-{id}"></i>
				<span class="DataTypeSelector-label">{label}</span>
			</button>
		{/each}
	</details>
</div>

<style>
	.DataTypeSelector {
	}

	button.DataTypeSelector-item {
		display: block;
		width: 100%;
		border: none;
		padding: 5px;
		text-align: left;
		cursor: pointer;
		background: color-mix(in srgb, var(--BG-COLOR), white 5%);
		color: color-mix(in srgb, var(--FG-COLOR), var(--ACCENT-COLOR) 70%);
	}

	button.DataTypeSelector-item._current {
		background: color-mix(in srgb, var(--BG-COLOR), var(--ACCENT-COLOR) 70%);
		color: color-mix(in srgb, var(--FG-COLOR), var(--ACCENT-COLOR) 5%);
	}

	button.DataTypeSelector-item:hover,
	button.DataTypeSelector-item:focus {
		background: color-mix(in srgb, var(--FG-COLOR), white 5%);
		color: color-mix(in srgb, var(--BG-COLOR), var(--ACCENT-COLOR) 5%);
	}

	.DataTypeSelector-icon {
	}

	button.DataTypeSelector-item._data-undefined           { --ACCENT-COLOR: var(--COLOR-DATA-UNDEFINED);           }
	button.DataTypeSelector-item._data-null                { --ACCENT-COLOR: var(--COLOR-DATA-NULL);                }
	button.DataTypeSelector-item._data-bool                { --ACCENT-COLOR: var(--COLOR-DATA-BOOL);                }
	button.DataTypeSelector-item._data-number              { --ACCENT-COLOR: var(--COLOR-DATA-NUMBER);              }
	button.DataTypeSelector-item._data-string-plain        { --ACCENT-COLOR: var(--COLOR-DATA-STRING-PLAIN);        }
	button.DataTypeSelector-item._data-string-double       { --ACCENT-COLOR: var(--COLOR-DATA-STRING-DOUBLE);       }
	button.DataTypeSelector-item._data-string-single       { --ACCENT-COLOR: var(--COLOR-DATA-STRING-SINGLE);       }
	button.DataTypeSelector-item._data-string-pipe         { --ACCENT-COLOR: var(--COLOR-DATA-STRING-PIPE);         }
	button.DataTypeSelector-item._data-string-pipe-dash    { --ACCENT-COLOR: var(--COLOR-DATA-STRING-PIPE-DASH);    }
	button.DataTypeSelector-item._data-string-pipe-plus    { --ACCENT-COLOR: var(--COLOR-DATA-STRING-PIPE-PLUS);    }
	button.DataTypeSelector-item._data-string-chevron      { --ACCENT-COLOR: var(--COLOR-DATA-STRING-CHEVRON);      }
	button.DataTypeSelector-item._data-string-chevron-dash { --ACCENT-COLOR: var(--COLOR-DATA-STRING-CHEVRON-DASH); }
	button.DataTypeSelector-item._data-string-chevron-plus { --ACCENT-COLOR: var(--COLOR-DATA-STRING-CHEVRON-PLUS); }
	button.DataTypeSelector-item._data-list                { --ACCENT-COLOR: var(--COLOR-DATA-LIST);                }
	button.DataTypeSelector-item._data-dict                { --ACCENT-COLOR: var(--COLOR-DATA-DICT);                }

	.DataTypeSelector-label {
	}
</style>
