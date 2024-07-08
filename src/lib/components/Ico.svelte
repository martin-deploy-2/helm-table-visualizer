<script lang="ts">
	import { ValType } from "./Val.svelte"

	export let type: ValType

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

	$: tlist = type == ValType.LIST
	$: tdict = type == ValType.DICT
</script>

{#if tundefined }
	<i class="bi bi-question-circle {className}"></i>
{:else if tnull }
	<i class="bi bi-slash-circle {className}"></i>
{:else if tbool }
	<i class="bi bi-toggles {className}"></i>
{:else if tnumber }
	<i class="bi bi-123 {className}"></i>
{:else if tstringplain }
	<i class="bi bi-alphabet-uppercase position-relative {className}"></i>
{:else if tstringsingle }
	<i class="bi bi-alphabet-uppercase position-relative {className}">
		<code class="position-absolute top-100 start-100 translate-middle bg-body rounded-circle fw-bolder text-center align-middle fst-normal" style="font-size: 0.6em; margin: -0.5em; 0 0 -0.5em; width: 1.5em; height: 1.5em; line-height: 1.5em;">'</code>
	</i>
{:else if tstringdouble }
	<i class="bi bi-alphabet-uppercase position-relative {className}">
		<code class="position-absolute top-100 start-100 translate-middle bg-body rounded-circle fw-bolder text-center align-middle fst-normal" style="font-size: 0.6em; margin: -0.5em; 0 0 -0.5em; width: 1.5em; height: 1.5em; line-height: 1.5em;">""</code>
	</i>
{:else if tstringpipe }
	<i class="bi bi-alphabet-uppercase position-relative {className}">
		<code class="position-absolute top-100 start-100 translate-middle bg-body rounded-circle fw-bolder text-center align-middle fst-normal" style="font-size: 0.6em; margin: -0.5em; 0 0 -0.5em; width: 1.5em; height: 1.5em; line-height: 1.5em;">|</code>
	</i>
{:else if tstringpipedash }
	<i class="bi bi-alphabet-uppercase position-relative {className}">
		<code class="position-absolute top-100 start-100 translate-middle bg-body rounded-circle fw-bolder text-center align-middle fst-normal" style="font-size: 0.6em; margin: -0.5em; 0 0 -0.5em; width: 1.5em; height: 1.5em; line-height: 1.5em;">|-</code>
	</i>
{:else if tstringpipeplus }
	<i class="bi bi-alphabet-uppercase position-relative {className}">
		<code class="position-absolute top-100 start-100 translate-middle bg-body rounded-circle fw-bolder text-center align-middle fst-normal" style="font-size: 0.6em; margin: -0.5em; 0 0 -0.5em; width: 1.5em; height: 1.5em; line-height: 1.5em;">|+</code>
	</i>
{:else if tstringchevron }
	<i class="bi bi-alphabet-uppercase position-relative {className}">
		<code class="position-absolute top-100 start-100 translate-middle bg-body rounded-circle fw-bolder text-center align-middle fst-normal" style="font-size: 0.6em; margin: -0.5em; 0 0 -0.5em; width: 1.5em; height: 1.5em; line-height: 1.5em;">&gt;</code>
	</i>
{:else if tstringchevrondash }
	<i class="bi bi-alphabet-uppercase position-relative {className}">
		<code class="position-absolute top-100 start-100 translate-middle bg-body rounded-circle fw-bolder text-center align-middle fst-normal" style="font-size: 0.6em; margin: -0.5em; 0 0 -0.5em; width: 1.5em; height: 1.5em; line-height: 1.5em;">&gt;-</code>
	</i>
{:else if tstringchevronplus }
	<i class="bi bi-alphabet-uppercase position-relative {className}">
		<code class="position-absolute top-100 start-100 translate-middle bg-body rounded-circle fw-bolder text-center align-middle fst-normal" style="font-size: 0.6em; margin: -0.5em; 0 0 -0.5em; width: 1.5em; height: 1.5em; line-height: 1.5em;">&gt;+</code>
	</i>
{:else if tlist }
	<i class="bi bi-list-ul {className}"></i>
{:else if tdict }
	<i class="bi bi-list-nested {className}"></i>
{/if}
