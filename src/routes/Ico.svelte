<script lang="ts">
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

	export let tlist = false
	export let tdict = false

	let className = ""
	export { className as class }
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
