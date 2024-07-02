<script lang="ts">
	import { browser } from "$app/environment"
	import { onMount } from "svelte"

	import "bootstrap/dist/css/bootstrap.css"
	import "bootstrap-icons/font/bootstrap-icons.css"

	onMount(async () => {
		if (browser) {
			const _bootstrap = await import("bootstrap")
			console.log(_bootstrap)
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
					<th scope="row" class="position-sticky start-0 z-2 bg-secondary-subtle font-monospace fw-normal" style="white-space: preserve;">exampleDict</th>
					<td class="p-0"></td>
				</tr>
				<tr>
					<th scope="row" class="position-sticky start-0 z-2 bg-secondary-subtle font-monospace fw-normal" style="white-space: preserve;">  exampleUndefined</th>
					<td class="p-0"></td>
				</tr>
				<tr>
					<th scope="row" class="position-sticky start-0 z-2 bg-secondary-subtle font-monospace fw-normal" style="white-space: preserve;">  exampleNull</th>
					<td class="p-0"></td>
				</tr>
				<tr>
					<th scope="row" class="position-sticky start-0 z-2 bg-secondary-subtle font-monospace fw-normal" style="white-space: preserve;">  exampleBool</th>
					<td class="p-0">
						<div class="dropend d-flex flex-row align-items-stretch">
							<button class="btn btn-secondary btn-sm dropdown-toggle flex-shrink-1 rounded-0 rounded-start" type="button" data-bs-toggle="dropdown" aria-expanded="false">
								<i class="bi bi-toggles"></i>
							</button>
							<ul class="dropdown-menu">
								<li><button class="dropdown-item px-2 py-1"><i class="bi bi-question-circle me-1"></i> Undefined <span class="text-body-secondary">→ default</span></button></li>
								<li><button class="dropdown-item px-2 py-1"><i class="bi bi-slash-circle me-1"></i> Null <span class="text-body-secondary">→ delete</span></button></li>
								<li><button class="dropdown-item px-2 py-1 active"><i class="bi bi-toggles me-1"></i> Boolean</button></li>
								<li><button class="dropdown-item px-2 py-1"><i class="bi bi-123 me-1"></i> Number</button></li>
								<li><hr class="dropdown-divider my-2"></li>
								<li><button class="dropdown-item px-2 py-1"><i class="bi bi-alphabet-uppercase me-1 position-relative"></i> String <span class="text-body-secondary">no quotes</span></button></li>
								<li><button class="dropdown-item px-2 py-1"><i class="bi bi-alphabet-uppercase me-1 position-relative">
									<code class="position-absolute top-100 start-100 translate-middle bg-body rounded-circle fw-bolder text-center align-middle fst-normal" style="font-size: 0.6em; margin: -0.5em; 0 0 -0.5em; width: 1.5em; height: 1.5em; line-height: 1.5em;">'</code>
								</i> String <span class="text-body-secondary"><code>'</code> quotes</span></button></li>
								<li><button class="dropdown-item px-2 py-1"><i class="bi bi-alphabet-uppercase me-1 position-relative">
									<code class="position-absolute top-100 start-100 translate-middle bg-body rounded-circle fw-bolder text-center align-middle fst-normal" style="font-size: 0.6em; margin: -0.5em; 0 0 -0.5em; width: 1.5em; height: 1.5em; line-height: 1.5em;">""</code>
								</i> String <span class="text-body-secondary"><code>"</code> quotes</span></button></li>
								<li><button class="dropdown-item px-2 py-1"><i class="bi bi-alphabet-uppercase me-1 position-relative">
									<code class="position-absolute top-100 start-100 translate-middle bg-body rounded-circle fw-bolder text-center align-middle fst-normal" style="font-size: 0.6em; margin: -0.5em; 0 0 -0.5em; width: 1.5em; height: 1.5em; line-height: 1.5em;">|</code>
								</i> String <span class="text-body-secondary"><code>|</code> block</span></button></li>
								<li><button class="dropdown-item px-2 py-1"><i class="bi bi-alphabet-uppercase me-1 position-relative">
									<code class="position-absolute top-100 start-100 translate-middle bg-body rounded-circle fw-bolder text-center align-middle fst-normal" style="font-size: 0.6em; margin: -0.5em; 0 0 -0.5em; width: 1.5em; height: 1.5em; line-height: 1.5em;">|-</code>
								</i> String <span class="text-body-secondary"><code>|-</code> block</span></button></li>
								<li><button class="dropdown-item px-2 py-1"><i class="bi bi-alphabet-uppercase me-1 position-relative">
									<code class="position-absolute top-100 start-100 translate-middle bg-body rounded-circle fw-bolder text-center align-middle fst-normal" style="font-size: 0.6em; margin: -0.5em; 0 0 -0.5em; width: 1.5em; height: 1.5em; line-height: 1.5em;">|+</code>
								</i> String <span class="text-body-secondary"><code>|+</code> block</span></button></li>
								<li><button class="dropdown-item px-2 py-1"><i class="bi bi-alphabet-uppercase me-1 position-relative">
									<code class="position-absolute top-100 start-100 translate-middle bg-body rounded-circle fw-bolder text-center align-middle fst-normal" style="font-size: 0.6em; margin: -0.5em; 0 0 -0.5em; width: 1.5em; height: 1.5em; line-height: 1.5em;">&gt;</code>
								</i> String <span class="text-body-secondary"><code>&gt;</code> block</span></button></li>
								<li><button class="dropdown-item px-2 py-1"><i class="bi bi-alphabet-uppercase me-1 position-relative">
									<code class="position-absolute top-100 start-100 translate-middle bg-body rounded-circle fw-bolder text-center align-middle fst-normal" style="font-size: 0.6em; margin: -0.5em; 0 0 -0.5em; width: 1.5em; height: 1.5em; line-height: 1.5em;">&gt;-</code>
								</i> String <span class="text-body-secondary"><code>&gt;-</code> block</span></button></li>
								<li><button class="dropdown-item px-2 py-1"><i class="bi bi-alphabet-uppercase me-1 position-relative">
									<code class="position-absolute top-100 start-100 translate-middle bg-body rounded-circle fw-bolder text-center align-middle fst-normal" style="font-size: 0.6em; margin: -0.5em; 0 0 -0.5em; width: 1.5em; height: 1.5em; line-height: 1.5em;">&gt;+</code>
								</i> String <span class="text-body-secondary"><code>&gt;+</code> block</span></button></li>
								<li><hr class="dropdown-divider my-2"></li>
								<li><button class="dropdown-item px-2 py-1"><i class="bi bi-list-ul me-1"></i> List</button></li>
								<li><button class="dropdown-item px-2 py-1"><i class="bi bi-list-nested me-1"></i> Dict</button></li>
							</ul>
							<div class="flex-shrink-2 w-100 p-0">
								<input class="form-check-input m-0 p-0 w-100 h-100 rounded-0 rounded-end" style="background-size: 1em;" type="checkbox" checked/>
							</div>
						</div>
					</td>
				</tr>
				<tr>
					<th scope="row" class="position-sticky start-0 z-2 bg-secondary-subtle font-monospace fw-normal" style="white-space: preserve;">  exampleNumber</th>
					<td class="p-0">
						<div class="dropend d-flex flex-row align-items-stretch">
							<button class="btn btn-secondary btn-sm dropdown-toggle flex-shrink-1 rounded-0 rounded-start" type="button" data-bs-toggle="dropdown" aria-expanded="false">
								<i class="bi bi-123"></i>
							</button>
							<ul class="dropdown-menu">
								<li><button class="dropdown-item px-2 py-1"><i class="bi bi-question-circle me-1"></i> Undefined <span class="text-body-secondary">→ default</span></button></li>
								<li><button class="dropdown-item px-2 py-1"><i class="bi bi-slash-circle me-1"></i> Null <span class="text-body-secondary">→ delete</span></button></li>
								<li><button class="dropdown-item px-2 py-1"><i class="bi bi-toggles me-1"></i> Boolean</button></li>
								<li><button class="dropdown-item px-2 py-1 active"><i class="bi bi-123 me-1"></i> Number</button></li>
								<li><hr class="dropdown-divider my-2"></li>
								<li><button class="dropdown-item px-2 py-1"><i class="bi bi-alphabet-uppercase me-1 position-relative"></i> String <span class="text-body-secondary">no quotes</span></button></li>
								<li><button class="dropdown-item px-2 py-1"><i class="bi bi-alphabet-uppercase me-1 position-relative">
									<code class="position-absolute top-100 start-100 translate-middle bg-body rounded-circle fw-bolder text-center align-middle fst-normal" style="font-size: 0.6em; margin: -0.5em; 0 0 -0.5em; width: 1.5em; height: 1.5em; line-height: 1.5em;">'</code>
								</i> String <span class="text-body-secondary"><code>'</code> quotes</span></button></li>
								<li><button class="dropdown-item px-2 py-1"><i class="bi bi-alphabet-uppercase me-1 position-relative">
									<code class="position-absolute top-100 start-100 translate-middle bg-body rounded-circle fw-bolder text-center align-middle fst-normal" style="font-size: 0.6em; margin: -0.5em; 0 0 -0.5em; width: 1.5em; height: 1.5em; line-height: 1.5em;">""</code>
								</i> String <span class="text-body-secondary"><code>"</code> quotes</span></button></li>
								<li><button class="dropdown-item px-2 py-1"><i class="bi bi-alphabet-uppercase me-1 position-relative">
									<code class="position-absolute top-100 start-100 translate-middle bg-body rounded-circle fw-bolder text-center align-middle fst-normal" style="font-size: 0.6em; margin: -0.5em; 0 0 -0.5em; width: 1.5em; height: 1.5em; line-height: 1.5em;">|</code>
								</i> String <span class="text-body-secondary"><code>|</code> block</span></button></li>
								<li><button class="dropdown-item px-2 py-1"><i class="bi bi-alphabet-uppercase me-1 position-relative">
									<code class="position-absolute top-100 start-100 translate-middle bg-body rounded-circle fw-bolder text-center align-middle fst-normal" style="font-size: 0.6em; margin: -0.5em; 0 0 -0.5em; width: 1.5em; height: 1.5em; line-height: 1.5em;">|-</code>
								</i> String <span class="text-body-secondary"><code>|-</code> block</span></button></li>
								<li><button class="dropdown-item px-2 py-1"><i class="bi bi-alphabet-uppercase me-1 position-relative">
									<code class="position-absolute top-100 start-100 translate-middle bg-body rounded-circle fw-bolder text-center align-middle fst-normal" style="font-size: 0.6em; margin: -0.5em; 0 0 -0.5em; width: 1.5em; height: 1.5em; line-height: 1.5em;">|+</code>
								</i> String <span class="text-body-secondary"><code>|+</code> block</span></button></li>
								<li><button class="dropdown-item px-2 py-1"><i class="bi bi-alphabet-uppercase me-1 position-relative">
									<code class="position-absolute top-100 start-100 translate-middle bg-body rounded-circle fw-bolder text-center align-middle fst-normal" style="font-size: 0.6em; margin: -0.5em; 0 0 -0.5em; width: 1.5em; height: 1.5em; line-height: 1.5em;">&gt;</code>
								</i> String <span class="text-body-secondary"><code>&gt;</code> block</span></button></li>
								<li><button class="dropdown-item px-2 py-1"><i class="bi bi-alphabet-uppercase me-1 position-relative">
									<code class="position-absolute top-100 start-100 translate-middle bg-body rounded-circle fw-bolder text-center align-middle fst-normal" style="font-size: 0.6em; margin: -0.5em; 0 0 -0.5em; width: 1.5em; height: 1.5em; line-height: 1.5em;">&gt;-</code>
								</i> String <span class="text-body-secondary"><code>&gt;-</code> block</span></button></li>
								<li><button class="dropdown-item px-2 py-1"><i class="bi bi-alphabet-uppercase me-1 position-relative">
									<code class="position-absolute top-100 start-100 translate-middle bg-body rounded-circle fw-bolder text-center align-middle fst-normal" style="font-size: 0.6em; margin: -0.5em; 0 0 -0.5em; width: 1.5em; height: 1.5em; line-height: 1.5em;">&gt;+</code>
								</i> String <span class="text-body-secondary"><code>&gt;+</code> block</span></button></li>
								<li><hr class="dropdown-divider my-2"></li>
								<li><button class="dropdown-item px-2 py-1"><i class="bi bi-list-ul me-1"></i> List</button></li>
								<li><button class="dropdown-item px-2 py-1"><i class="bi bi-list-nested me-1"></i> Dict</button></li>
							</ul>
							<div class="flex-shrink-2 w-100 p-0">
								<input class="form-control p-0 w-100 h-100 rounded-0 rounded-end text-end font-monospace" type="number" value="300"/>
							</div>
						</div>
					</td>
				</tr>
				<tr>
					<th scope="row" class="position-sticky start-0 z-2 bg-secondary-subtle font-monospace fw-normal" style="white-space: preserve;">  exampleString</th>
					<td class="p-0"></td>
				</tr>
				<tr>
					<th scope="row" class="position-sticky start-0 z-2 bg-secondary-subtle font-monospace fw-normal" style="white-space: preserve;">  exampleList</th>
					<td class="p-0"></td>
				</tr>

				{#each { length: 100 } as _}
					<tr>
						<th scope="row" class="position-sticky start-0 z-2 bg-secondary-subtle font-monospace fw-normal" style="white-space: preserve;">FillMe</th>
						<td class="p-0"></td>
					</tr>
				{/each}





  </tbody>
</table>


	</div>
</div>
