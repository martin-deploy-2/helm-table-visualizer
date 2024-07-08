<script lang="ts">
	import Ico from "./Ico.svelte"

	export let type: ValType
	export let value: ValValue
	export let isFromFallback: boolean

	let className = ""
	export { className as class }

	$: tundefined = type == ValType.UNDEFINED
	$: tnull = type == ValType.NULL
	$: tbool = type == ValType.BOOL
	$: tnumber = type == ValType.NUMBER

	$: tstringplain = type == ValType.STRING_PLAIN
	$: tstringsingle = type == ValType.STRING_SINGLE
	$: tstringdouble = type == ValType.STRING_DOUBLE
	$: tstringpipe = type == ValType.STRING_PIPE
	$: tstringpipedash = type == ValType.STRING_PIPE_DASH
	$: tstringpipeplus = type == ValType.STRING_PIPE_PLUS
	$: tstringchevron = type == ValType.STRING_CHEVRON
	$: tstringchevrondash = type == ValType.STRING_CHEVRON_DASH
	$: tstringchevronplus = type == ValType.STRING_CHEVRON_PLUS

	$: tstring = tstringplain || tstringsingle || tstringdouble || tstringpipe || tstringpipedash || tstringpipeplus || tstringchevron || tstringchevrondash || tstringchevronplus

	$: tlist = type == ValType.LIST
	$: tdict = type == ValType.DICT
</script>

<div class="dropend d-flex flex-row align-items-stretch {className}" style="min-height: 100%; border-bottom: 1px solid transparent; border-right: 1px solid transparent;">
	<button class="btn btn-secondary dropdown-toggle flex-shrink-1 rounded-0 rounded-start {isFromFallback ? "opacity-50" : ""}" style="padding: 0.15rem 0.40rem;" type="button" data-bs-toggle="dropdown" aria-expanded="false">
		<Ico {type}/>
	</button>
	<ul class="dropdown-menu">
		<li><button class="dropdown-item px-2 py-1" class:active={tundefined}><Ico type={ValType.UNDEFINED} class="me-1"/> Undefined <span class="text-body-secondary">→ default</span></button></li>
		<li><button class="dropdown-item px-2 py-1" class:active={tnull}><Ico type={ValType.NULL} class="me-1"/> Null <span class="text-body-secondary">→ delete</span></button></li>
		<li><button class="dropdown-item px-2 py-1" class:active={tbool}><Ico type={ValType.BOOL} class="me-1"/> Boolean</button></li>
		<li><button class="dropdown-item px-2 py-1" class:active={tnumber}><Ico type={ValType.NUMBER} class="me-1"/> Number</button></li>
		<li><hr class="dropdown-divider my-2"></li>
		<li><button class="dropdown-item px-2 py-1" class:active={tstringplain}><Ico type={ValType.STRING_PLAIN} class="me-1"/> String <span class="text-body-secondary">no quotes</span></button></li>
		<li><button class="dropdown-item px-2 py-1" class:active={tstringsingle}><Ico type={ValType.STRING_SINGLE} class="me-1"/> String <span class="text-body-secondary"><code>'</code> quotes</span></button></li>
		<li><button class="dropdown-item px-2 py-1" class:active={tstringdouble}><Ico type={ValType.STRING_DOUBLE} class="me-1"/> String <span class="text-body-secondary"><code>"</code> quotes</span></button></li>
		<li><button class="dropdown-item px-2 py-1" class:active={tstringpipe}><Ico type={ValType.STRING_PIPE} class="me-1"/> String <span class="text-body-secondary"><code>|</code> block</span></button></li>
		<li><button class="dropdown-item px-2 py-1" class:active={tstringpipedash}><Ico type={ValType.STRING_PIPE_DASH} class="me-1"/> String <span class="text-body-secondary"><code>|-</code> block</span></button></li>
		<li><button class="dropdown-item px-2 py-1" class:active={tstringpipeplus}><Ico type={ValType.STRING_PIPE_PLUS} class="me-1"/> String <span class="text-body-secondary"><code>|+</code> block</span></button></li>
		<li><button class="dropdown-item px-2 py-1" class:active={tstringchevron}><Ico type={ValType.STRING_CHEVRON} class="me-1"/> String <span class="text-body-secondary"><code>&gt;</code> block</span></button></li>
		<li><button class="dropdown-item px-2 py-1" class:active={tstringchevrondash}><Ico type={ValType.STRING_CHEVRON_DASH} class="me-1"/> String <span class="text-body-secondary"><code>&gt;-</code> block</span></button></li>
		<li><button class="dropdown-item px-2 py-1" class:active={tstringchevronplus}><Ico type={ValType.STRING_CHEVRON_PLUS} class="me-1"/> String <span class="text-body-secondary"><code>&gt;+</code> block</span></button></li>
		<li><hr class="dropdown-divider my-2"></li>
		<li><button class="dropdown-item px-2 py-1" class:active={tlist}><Ico type={ValType.LIST} class="me-1"/> List</button></li>
		<li><button class="dropdown-item px-2 py-1" class:active={tdict}><Ico type={ValType.DICT} class="me-1"/> Dict</button></li>
	</ul>
	<div class="flex-shrink-2 w-100 p-0 {isFromFallback ? "opacity-50" : ""}" style="min-height: 100%;">
		{#if tundefined}
			<input class="form-control py-0 w-100 h-100 rounded-0 rounded-end font-monospace" type="text" disabled/>
		{:else if tnull}
			<input class="form-control py-0 w-100 h-100 rounded-0 rounded-end font-monospace" type="text" placeholder="~" disabled/>
		{:else if tbool}
			<input class="form-check-input m-0 p-0 w-100 h-100 rounded-0 rounded-end" style="background-size: 1em; cursor: pointer;" type="checkbox" checked={!!value}/>
		{:else if tnumber}
			<input class="form-control p-0 w-100 h-100 rounded-0 rounded-end text-end font-monospace" type="number" value={value}/>
		{:else if tstring}
			<div class="form-control py-0 rounded-0 rounded-end font-monospace text-nowrap overflow-auto" style="resize: both; min-width: 100%; max-width: 80em; min-height: 100%; max-height: 80vh;" role="textbox" contenteditable>{value}</div>
		{:else if tlist}
			<input class="form-control py-0 w-100 h-100 rounded-0 rounded-end font-monospace" type="text" placeholder="{"[]"}" disabled/>
		{:else if tdict}
			<input class="form-control py-0 w-100 h-100 rounded-0 rounded-end font-monospace" type="text" placeholder="{"{}"}" disabled/>
		{/if}
	</div>
</div>

<style>
	input[type="checkbox"] {
		--bs-form-check-bg-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%237f7f7f' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6.5 6.5L13.5 13.5M13.5 6.5L6.5 13.5'/%3e%3c/svg%3e");
	}
	input[type="checkbox"]:checked {
		background-color: var(--bs-success-border-subtle);
		border-color: var(--bs-success-border-subtle);
	}
</style>
