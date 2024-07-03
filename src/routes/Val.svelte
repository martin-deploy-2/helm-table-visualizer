<script lang="ts">
	import Ico from "./Ico.svelte"

	export let tundefined = false
	export let tnull = false
	export let tbool = false
	export let tnumber = false

	export let tstringplain = false
	export let tstringsingle = false
	export let tstringdouble = false
	export let tstringpipe = false
	export let tstringpipedash = false
	export let tstringpipeplus = false
	export let tstringchevron = false
	export let tstringchevrondash = false
	export let tstringchevronplus = false

	$: tstring = tstringplain || tstringsingle || tstringdouble || tstringpipe || tstringpipedash || tstringpipeplus || tstringchevron || tstringchevrondash || tstringchevronplus

	export let tlist = false
	export let tdict = false

	let className = ""
	export { className as class }
</script>

<div class="dropend d-flex flex-row align-items-stretch {className}" style="min-height: 100%; border-bottom: 1px solid transparent; border-right: 1px solid transparent;">
	<!-- <button class="btn btn-secondary btn-sm dropdown-toggle flex-shrink-1 rounded-0 rounded-start" type="button" data-bs-toggle="dropdown" aria-expanded="false"> -->
	<button class="btn btn-secondary dropdown-toggle flex-shrink-1 rounded-0 rounded-start" style="padding: 0.15rem 0.40rem;" type="button" data-bs-toggle="dropdown" aria-expanded="false">
		<Ico {tundefined} {tnull} {tbool} {tnumber} {tstringplain} {tstringsingle} {tstringdouble} {tstringpipe} {tstringpipedash} {tstringpipeplus} {tstringchevron} {tstringchevrondash} {tstringchevronplus} {tlist} {tdict}/>
	</button>
	<ul class="dropdown-menu">
		<li><button class="dropdown-item px-2 py-1" class:active={tundefined}><Ico tundefined class="me-1"/> Undefined <span class="text-body-secondary">→ default</span></button></li>
		<li><button class="dropdown-item px-2 py-1" class:active={tnull}><Ico tnull class="me-1"/> Null <span class="text-body-secondary">→ delete</span></button></li>
		<li><button class="dropdown-item px-2 py-1" class:active={tbool}><Ico tbool class="me-1"/> Boolean</button></li>
		<li><button class="dropdown-item px-2 py-1" class:active={tnumber}><Ico tnumber class="me-1"/> Number</button></li>
		<li><hr class="dropdown-divider my-2"></li>
		<li><button class="dropdown-item px-2 py-1" class:active={tstringplain}><Ico tstringplain class="me-1"/> String <span class="text-body-secondary">no quotes</span></button></li>
		<li><button class="dropdown-item px-2 py-1" class:active={tstringsingle}><Ico tstringsingle class="me-1"/> String <span class="text-body-secondary"><code>'</code> quotes</span></button></li>
		<li><button class="dropdown-item px-2 py-1" class:active={tstringdouble}><Ico tstringdouble class="me-1"/> String <span class="text-body-secondary"><code>"</code> quotes</span></button></li>
		<li><button class="dropdown-item px-2 py-1" class:active={tstringpipe}><Ico tstringpipe class="me-1"/> String <span class="text-body-secondary"><code>|</code> block</span></button></li>
		<li><button class="dropdown-item px-2 py-1" class:active={tstringpipedash}><Ico tstringpipedash class="me-1"/> String <span class="text-body-secondary"><code>|-</code> block</span></button></li>
		<li><button class="dropdown-item px-2 py-1" class:active={tstringpipeplus}><Ico tstringpipeplus class="me-1"/> String <span class="text-body-secondary"><code>|+</code> block</span></button></li>
		<li><button class="dropdown-item px-2 py-1" class:active={tstringchevron}><Ico tstringchevron class="me-1"/> String <span class="text-body-secondary"><code>&gt;</code> block</span></button></li>
		<li><button class="dropdown-item px-2 py-1" class:active={tstringchevrondash}><Ico tstringchevrondash class="me-1"/> String <span class="text-body-secondary"><code>&gt;-</code> block</span></button></li>
		<li><button class="dropdown-item px-2 py-1" class:active={tstringchevronplus}><Ico tstringchevronplus class="me-1"/> String <span class="text-body-secondary"><code>&gt;+</code> block</span></button></li>
		<li><hr class="dropdown-divider my-2"></li>
		<li><button class="dropdown-item px-2 py-1" class:active={tlist}><Ico tlist class="me-1"/> List</button></li>
		<li><button class="dropdown-item px-2 py-1" class:active={tdict}><Ico tdict class="me-1"/> Dict</button></li>
	</ul>
	<div class="flex-shrink-2 w-100 p-0" style="min-height: 100%;">
		{#if tundefined}
			<input class="form-control py-0 w-100 h-100 rounded-0 rounded-end font-monospace" type="text" placeholder="300" disabled/>
		{:else if tnull}
			<input class="form-control py-0 w-100 h-100 rounded-0 rounded-end font-monospace" type="text" placeholder="~" disabled/>
		{:else if tbool}
		<input class="form-check-input m-0 p-0 w-100 h-100 rounded-0 rounded-end" style="background-size: 1em; cursor: pointer;" type="checkbox" checked/>
		{:else if tnumber}
		<input class="form-control p-0 w-100 h-100 rounded-0 rounded-end text-end font-monospace" type="number" value="300"/>
		{:else if tstring}
		<div class="form-control py-0 rounded-0 rounded-end font-monospace text-nowrap overflow-auto" style="resize: both; min-width: 100%; max-width: 80em; min-height: 100%; max-height: 80vh;" role="textbox" contenteditable></div>
		{:else if tlist}
			<input class="form-control py-0 w-100 h-100 rounded-0 rounded-end font-monospace" type="text" placeholder="{"[]"}" disabled/>
		{:else if tdict}
			<input class="form-control py-0 w-100 h-100 rounded-0 rounded-end font-monospace" type="text" placeholder="{"{}"}" disabled/>
		{/if}
	</div>
</div>
