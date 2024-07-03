<script lang="ts">
	import { browser } from "$app/environment"
	import { onMount } from "svelte"
	import Val from "./Val.svelte"

	import "bootstrap/dist/css/bootstrap.css"
	import "bootstrap-icons/font/bootstrap-icons.css"

	onMount(async () => {
		if (browser) {
			const _bootstrap = await import("bootstrap")
		}
	})

	let darkTheme = true

	$: {
		if (browser) {
			document.documentElement.setAttribute("data-bs-theme", darkTheme ? "dark" : "light")
		}
	}
</script>

<div class="d-flex flex-row vh-100 overflow-hidden">
	<div class="flex-shrink-0 bg-primary-subtle px-4 py-3 overflow-y-auto">
		<span class="badge text-bg-primary">v2</span>
		<span class="badge text-bg-primary">application</span>
		<span class="badge text-bg-primary form-switch">
			<input class="form-check-input m-0" type="checkbox" role="switch" bind:checked={darkTheme}/>
		</span>
		<h1 class="h2 font-monospace">the-demo-chart</h1>

		<h2 class="h4 mt-3">Dependencies</h2>
		<ul class="list-group">
			<li class="list-group-item px-2 py-1">
				<span class="text-body-secondary fst-italic">front-end →</span>
				<span class="font-monospace">simple-deploy</span>
			<li class="list-group-item px-2 py-1">
				<span class="text-body-secondary fst-italic">back-end →</span>
				<span class="font-monospace">simple-deploy</span>
			<li class="list-group-item px-2 py-1">
				<span class="text-body-secondary fst-italic">proxy →</span>
				<span class="font-monospace">proxymity</span>
			<li class="list-group-item px-2 py-1">
				<span class="text-body-secondary fst-italic">netpols →</span>
				<span class="font-monospace">packet-guardian</span>
		</ul>

		<h2 class="h4 mt-3 mb-0">Values files</h2>
		<p class="text-body-secondary mt-1" style="max-width: 24em;">
			From top to bottom, in the order they will override each other, bottommost will take precedence.
		</p>

		<h3 class="h6 mt-3">From dependencies schemas</h3>
		<ul class="list-group">
			<li class="list-group-item px-2 py-1">
				<label class="form-check-label stretched-link">
					<input class="form-check-input me-1" type="checkbox" checked disabled/>
					<span class="text-body-secondary fst-italic">front-end →</span>
					<span class="font-monospace">simple-deploy/values.schema.json</span>
				</label>
			</li>
			<li class="list-group-item px-2 py-1">
				<label class="form-check-label stretched-link">
					<input class="form-check-input me-1" type="checkbox" checked disabled/>
					<span class="text-body-secondary fst-italic">back-end →</span>
					<span class="font-monospace">simple-deploy/values.schema.json</span>
				</label>
			</li>
			<li class="list-group-item px-2 py-1">
				<label class="form-check-label stretched-link">
					<input class="form-check-input me-1" type="checkbox" checked disabled/>
					<span class="text-body-secondary fst-italic">proxy →</span>
					<span class="font-monospace">proxymity/values.schema.json</span>
				</label>
			</li>
			<li class="list-group-item px-2 py-1">
				<label class="form-check-label stretched-link">
					<input class="form-check-input me-1" type="checkbox" checked disabled/>
					<span class="text-body-secondary fst-italic">netpols →</span>
					<span class="font-monospace">packet-guardian/values.schema.json</span>
				</label>
			</li>
		</ul>

		<h3 class="h6 mt-3">From dependencies default values</h3>
		<ul class="list-group">
			<li class="list-group-item px-2 py-1">
				<label class="form-check-label stretched-link">
					<input class="form-check-input me-1" type="checkbox" checked disabled/>
					<span class="text-body-secondary fst-italic">front-end →</span>
					<span class="font-monospace">simple-deploy/values.yaml</span>
				</label>
			</li>
			<li class="list-group-item px-2 py-1">
				<label class="form-check-label stretched-link">
					<input class="form-check-input me-1" type="checkbox" checked disabled/>
					<span class="text-body-secondary fst-italic">back-end →</span>
					<span class="font-monospace">simple-deploy/values.yaml</span>
				</label>
			</li>
			<li class="list-group-item px-2 py-1">
				<label class="form-check-label stretched-link">
					<input class="form-check-input me-1" type="checkbox" checked disabled/>
					<span class="text-body-secondary fst-italic">proxy →</span>
					<span class="font-monospace">proxymity/values.yaml</span>
				</label>
			</li>
			<li class="list-group-item px-2 py-1">
				<label class="form-check-label stretched-link">
					<input class="form-check-input me-1" type="checkbox" checked disabled/>
					<span class="text-body-secondary fst-italic">netpols →</span>
					<span class="font-monospace">packet-guardian/values.yaml</span>
				</label>
			</li>
		</ul>

		<h3 class="h6 mt-3">From chart schema</h3>
		<ul class="list-group">
			<li class="list-group-item px-2 py-1">
				<label class="form-check-label stretched-link">
					<input class="form-check-input me-1" type="checkbox" checked disabled/>
					<span class="font-monospace">values.yaml</span>
				</label>
			</li>
		</ul>

		<h3 class="h6 mt-3">From chart default values</h3>
		<ul class="list-group">
			<li class="list-group-item px-2 py-1">
				<label class="form-check-label stretched-link">
					<input class="form-check-input me-1" type="checkbox" checked disabled/>
					<span class="font-monospace">values.yaml</span>
				</label>
			</li>
		</ul>

		<h3 class="h6 mt-3 mb-1">From chart overlay values</h3>
		<label class="form-label mb-0 w-100">
			<span class="text-body-secondary">Pattern:</span>
			<input type="search" class="form-control mt-1" placeholder="values/**/*.yaml"/>
		</label>
		<p class="text-body-secondary mt-1 mb-2">
			Drag to re-order.
		</p>
		<ul class="list-group">
			<li class="list-group-item px-2 py-1">
				<label class="form-check-label stretched-link">
					<input class="form-check-input me-1" type="checkbox"/>
					<span class="font-monospace">values/eu/all.yaml</span>
				</label>
			</li>
			<li class="list-group-item px-2 py-1">
				<label class="form-check-label stretched-link">
					<input class="form-check-input me-1" type="checkbox"/>
					<span class="font-monospace">values/eu/dev.yaml</span>
				</label>
			</li>
			<li class="list-group-item px-2 py-1">
				<label class="form-check-label stretched-link">
					<input class="form-check-input me-1" type="checkbox"/>
					<span class="font-monospace">values/eu/qa.yaml</span>
				</label>
			</li>
			<li class="list-group-item px-2 py-1">
				<label class="form-check-label stretched-link">
					<input class="form-check-input me-1" type="checkbox"/>
					<span class="font-monospace">values/eu/prod/all.yaml</span>
				</label>
			</li>
			<li class="list-group-item px-2 py-1">
				<label class="form-check-label stretched-link">
					<input class="form-check-input me-1" type="checkbox"/>
					<span class="font-monospace">values/eu/prod/a.yaml</span>
				</label>
			</li>
			<li class="list-group-item px-2 py-1">
				<label class="form-check-label stretched-link">
					<input class="form-check-input me-1" type="checkbox"/>
					<span class="font-monospace">values/eu/prod/b.yaml</span>
				</label>
			</li>
			<li class="list-group-item px-2 py-1">
				<label class="form-check-label stretched-link">
					<input class="form-check-input me-1" type="checkbox"/>
					<span class="font-monospace">values/us/all.yaml</span>
				</label>
			</li>
			<li class="list-group-item px-2 py-1">
				<label class="form-check-label stretched-link">
					<input class="form-check-input me-1" type="checkbox"/>
					<span class="font-monospace">values/us/qa.yaml</span>
				</label>
			</li>
			<li class="list-group-item px-2 py-1">
				<label class="form-check-label stretched-link">
					<input class="form-check-input me-1" type="checkbox"/>
					<span class="font-monospace">values/us/prod.yaml</span>
				</label>
			</li>
		</ul>
	</div>
	<div class="flex-shrink-1 p-0 overflow-auto">
		<table class="table table-sm table-borderless">
			<thead class="sticky-top">
				<tr>
					<th scope="col" class="bg-secondary-subtle text-nowrap text-body-secondary position-sticky start-0 text-end" style="min-width: 200px;">Keys \ Values</th>
					<th scope="col" class="bg-secondary-subtle text-nowrap text-body-secondary" style="min-width: 300px;">From dependencies schemas</th>
					<th scope="col" class="bg-secondary-subtle text-nowrap text-body-secondary" style="min-width: 300px;">From dependencies default values</th>
					<th scope="col" class="bg-secondary-subtle text-nowrap text-body-secondary" style="min-width: 300px;">From chart schema</th>
					<th scope="col" class="bg-secondary-subtle text-nowrap text-body-secondary" style="min-width: 300px;">From chart default values</th>
					<th scope="col" class="bg-secondary-subtle text-nowrap font-monospace" style="min-width: 300px;">values/eu/all.yaml</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row" class="position-sticky start-0 z-2 bg-secondary-subtle font-monospace fw-normal" style="white-space: preserve; text-wrap: nowrap;">exampleDict</th>
					<td class="p-0">
						<Val tdict/>
					</td>
				</tr>
				<tr>
					<th scope="row" class="position-sticky start-0 z-2 bg-secondary-subtle font-monospace fw-normal" style="white-space: preserve; text-wrap: nowrap;">  exampleUndefined</th>
					<td class="p-0">
						<Val tundefined/>
					</td>
				</tr>
				<tr>
					<th scope="row" class="position-sticky start-0 z-2 bg-secondary-subtle font-monospace fw-normal" style="white-space: preserve; text-wrap: nowrap;">  exampleNull</th>
					<td class="p-0">
						<Val tnull/>
					</td>
				</tr>
				<tr>
					<th scope="row" class="position-sticky start-0 z-2 bg-secondary-subtle font-monospace fw-normal" style="white-space: preserve; text-wrap: nowrap;">  exampleBool</th>
					<td class="p-0">
						<Val tbool/>
					</td>
				</tr>
				<tr>
					<th scope="row" class="position-sticky start-0 z-2 bg-secondary-subtle font-monospace fw-normal" style="white-space: preserve; text-wrap: nowrap;">  exampleNumber</th>
					<td class="p-0">
						<Val tnumber/>
					</td>
				</tr>
				<tr>
					<th scope="row" class="position-sticky start-0 z-2 bg-secondary-subtle font-monospace fw-normal" style="white-space: preserve; text-wrap: nowrap;">  exampleString_plain</th>
					<td class="p-0">
						<Val tstringplain/>
					</td>
				</tr>
				<tr>
					<th scope="row" class="position-sticky start-0 z-2 bg-secondary-subtle font-monospace fw-normal" style="white-space: preserve; text-wrap: nowrap;">  exampleString_single</th>
					<td class="p-0">
						<Val tstringsingle/>
					</td>
				</tr>
				<tr>
					<th scope="row" class="position-sticky start-0 z-2 bg-secondary-subtle font-monospace fw-normal" style="white-space: preserve; text-wrap: nowrap;">  exampleString_double</th>
					<td class="p-0">
						<Val tstringdouble/>
					</td>
				</tr>
				<tr>
					<th scope="row" class="position-sticky start-0 z-2 bg-secondary-subtle font-monospace fw-normal" style="white-space: preserve; text-wrap: nowrap;">  exampleString_pipe</th>
					<td class="p-0">
						<Val tstringpipe/>
					</td>
				</tr>
				<tr>
					<th scope="row" class="position-sticky start-0 z-2 bg-secondary-subtle font-monospace fw-normal" style="white-space: preserve; text-wrap: nowrap;">  exampleString_pipedash</th>
					<td class="p-0">
						<Val tstringpipedash/>
					</td>
				</tr>
				<tr>
					<th scope="row" class="position-sticky start-0 z-2 bg-secondary-subtle font-monospace fw-normal" style="white-space: preserve; text-wrap: nowrap;">  exampleString_pipeplus</th>
					<td class="p-0">
						<Val tstringpipeplus/>
					</td>
				</tr>
				<tr>
					<th scope="row" class="position-sticky start-0 z-2 bg-secondary-subtle font-monospace fw-normal" style="white-space: preserve; text-wrap: nowrap;">  exampleString_chevron</th>
					<td class="p-0">
						<Val tstringchevron/>
					</td>
				</tr>
				<tr>
					<th scope="row" class="position-sticky start-0 z-2 bg-secondary-subtle font-monospace fw-normal" style="white-space: preserve; text-wrap: nowrap;">  exampleString_chevrondash</th>
					<td class="p-0">
						<Val tstringchevrondash/>
					</td>
				</tr>
				<tr>
					<th scope="row" class="position-sticky start-0 z-2 bg-secondary-subtle font-monospace fw-normal" style="white-space: preserve; text-wrap: nowrap;">  exampleString_chevronplus</th>
					<td class="p-0">
						<Val tstringchevronplus/>
					</td>
				</tr>
				<tr>
					<th scope="row" class="position-sticky start-0 z-2 bg-secondary-subtle font-monospace fw-normal" style="white-space: preserve; text-wrap: nowrap;">  exampleList</th>
					<td class="p-0">
						<Val tlist/>
					</td>
				</tr>

				{#each { length: 100 } as _}
					<tr>
						<th scope="row" class="position-sticky start-0 z-2 bg-secondary-subtle font-monospace fw-normal" style="white-space: preserve; text-wrap: nowrap;">FillMe</th>
						<td class="p-0"></td>
					</tr>
				{/each}





  </tbody>
</table>


	</div>
</div>
