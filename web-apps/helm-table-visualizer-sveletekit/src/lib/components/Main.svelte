<script lang="ts">
	import { browser } from "$app/environment"
	import type { InternalInteractor } from "$lib/data/model"

	export let model: InternalInteractor

	let darkTheme = true

	$: {
		if (browser) {
			document.documentElement.setAttribute("data-bs-theme", darkTheme ? "dark" : "light")
		}
	}
</script>

<div class="d-flex flex-row vh-100 overflow-hidden">
	<div class="flex-shrink-0 bg-primary-subtle px-4 py-3 overflow-y-auto">
		<span class="badge text-bg-primary">{model.apiVersion}</span>
		{#if model.type}
			<span class="badge text-bg-primary">{model.type}</span>
		{/if}
		<span class="badge text-bg-primary form-switch">
			<input class="form-check-input m-0" type="checkbox" role="switch" bind:checked={darkTheme}/>
		</span>
		<h1 class="h2 font-monospace">{model.name}</h1>

		<h2 class="h4 mt-3">Dependencies</h2>
		{#if model.dependencies.length}
			<ul class="list-group">
				{#each model.dependencies as d}
					<li class="list-group-item px-2 py-1">
						<span class="text-body-secondary fst-italic">{d.alias} →</span>
						<span class="font-monospace">{d.subChartName}</span>
					</li>
				{/each}
			</ul>
		{:else}
			<p class="text-body-secondary mt-1">
				No dependencies.
			</p>
		{/if}

		<h2 class="h4 mt-3 mb-0">Values files</h2>
		<p class="text-body-secondary mt-1" style="max-width: 24em;">
			From top to bottom, in the order they will override each other, bottommost will take precedence.
		</p>

		<h3 class="h6 mt-3">From dependencies schemas</h3>
		{#if model.valuesFromDependenciesSchema.length}
			<ul class="list-group">
				{#each model.valuesFromDependenciesSchema as d}
					<li class="list-group-item px-2 py-1">
						<label class="form-check-label stretched-link">
							<input class="form-check-input me-1" type="checkbox" checked disabled/>
							<span class="text-body-secondary fst-italic">{d.alias} →</span>
							<span class="font-monospace">{d.path}</span>
						</label>
					</li>
				{/each}
			</ul>
		{:else}
			<p class="text-body-secondary mt-1">
				No dependencies schemas.
			</p>
		{/if}

		<h3 class="h6 mt-3">From dependencies default values</h3>
		{#if model.valuesFromDependenciesDefaultValues.length}
			<ul class="list-group">
				{#each model.valuesFromDependenciesDefaultValues as d}
					<li class="list-group-item px-2 py-1">
						<label class="form-check-label stretched-link">
							<input class="form-check-input me-1" type="checkbox" checked disabled/>
							<span class="text-body-secondary fst-italic">{d.alias} →</span>
							<span class="font-monospace">{d.path}</span>
						</label>
					</li>
				{/each}
			</ul>
		{:else}
			<p class="text-body-secondary mt-1">
				No dependencies default values.
			</p>
		{/if}

		<h3 class="h6 mt-3">From chart schema</h3>
		{#if model.valuesFromChartSchema}
			<ul class="list-group">
				<li class="list-group-item px-2 py-1">
					<label class="form-check-label stretched-link">
						<input class="form-check-input me-1" type="checkbox" checked disabled/>
						<span class="font-monospace">values.schema.json</span>
					</label>
				</li>
			</ul>
		{:else}
			<p class="text-body-secondary mt-1">
				No schema.
			</p>
		{/if}

		<h3 class="h6 mt-3">From chart default values</h3>
		{#if model.valuesFromChartDefaultValues}
			<ul class="list-group">
				<li class="list-group-item px-2 py-1">
					<label class="form-check-label stretched-link">
						<input class="form-check-input me-1" type="checkbox" checked disabled/>
						<span class="font-monospace">values.yaml</span>
					</label>
				</li>
			</ul>
		{:else}
			<p class="text-body-secondary mt-1">
				No default values.
			</p>
		{/if}

		<h3 class="h6 mt-3 mb-1">From chart overlay values</h3>
		<label class="form-label mb-0 w-100">
			<span class="text-body-secondary">Pattern:</span>
			<input type="search" class="form-control mt-1" bind:value={model.overlayValuesYamlGlobPattern}/>
		</label>
		<p class="text-body-secondary mt-1 mb-2">
			Drag to re-order.
		</p>
		{#if model.valuesFromChartOverlayValues.length}
			<ul class="list-group">
				{#each model.valuesFromChartOverlayValues as o}
					<li class="list-group-item px-2 py-1">
						<label class="form-check-label stretched-link">
							<input class="form-check-input me-1" type="checkbox" bind:checked={o.enabled}/>
							<span class="font-monospace">{o.path}</span>
						</label>
					</li>
				{/each}
			</ul>
		{:else}
			<p class="text-body-secondary mt-1">
				No overlay values.
			</p>
		{/if}
	</div>
	<div class="flex-shrink-1 p-0 overflow-auto">
		<table class="table table-sm table-borderless">
			<thead class="sticky-top">
				<tr>
					<th scope="col" class="bg-secondary-subtle text-nowrap text-body-secondary position-sticky start-0 text-end" style="min-width: 200px;">Keys \ Values</th>
					{#if model.valuesFromDependenciesSchema.length}
						<th scope="col" class="bg-secondary-subtle text-nowrap text-body-secondary" style="min-width: 300px;">From dependencies schemas</th>
					{/if}
					{#if model.valuesFromDependenciesDefaultValues.length}
						<th scope="col" class="bg-secondary-subtle text-nowrap text-body-secondary" style="min-width: 300px;">From dependencies default values</th>
					{/if}
					{#if model.valuesFromChartSchema}
						<th scope="col" class="bg-secondary-subtle text-nowrap text-body-secondary" style="min-width: 300px;">From chart schema</th>
					{/if}
					{#if model.valuesFromChartDefaultValues}
						<th scope="col" class="bg-secondary-subtle text-nowrap text-body-secondary" style="min-width: 300px;">From chart default values</th>
					{/if}
					{#each model.valuesFromChartOverlayValues as o}
						{#if o.enabled}
							<th scope="col" class="bg-secondary-subtle text-nowrap font-monospace" style="min-width: 300px;">values/eu/all.yaml</th>
						{/if}
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each keys as key}
					<Key {...key}/>
				{/each}
			</tbody>
		</table>
	</div>
</div>
