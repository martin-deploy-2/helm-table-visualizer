<script lang="ts">
	import "../styles/icons.css"

	let theme = true
</script>

<div class="Main {theme ? "theme-light" : "theme-dark"}">
	<div class="Sidebar">
		<input type="checkbox" bind:checked={theme}/>

		<div class="ChartMeta">
			<h1>
				<span class="ChartMeta-apiVersion">v2</span>
				<span class="ChartMeta-type">application</span>
				<span class="ChartMeta-name">the-demo-chart</span>
			</h1>
		</div>

		<div class="ChartDependencies">
			<h2>Dependencies</h2>
			<ul>
				<li>
					<span class="ChartDependencies-alias">front-end</span>
					<span class="ChartDependencies-subChart">simple-deploy</span>
				<li>
					<span class="ChartDependencies-alias">back-end</span>
					<span class="ChartDependencies-subChart">simple-deploy</span>
				<li>
					<span class="ChartDependencies-alias">proxy</span>
					<span class="ChartDependencies-subChart">proxymity</span>
				<li>
					<span class="ChartDependencies-alias">netpols</span>
					<span class="ChartDependencies-subChart">packet-guardian</span>
			</ul>
		</div>

		<div class="ChartValuesFiles">
			<h2>Values files</h2>
			<p>From top to bottom, in the order they will override each other, bottommost will take precedence.</p>

			<h3>From dependencies schemas</h3>
			<ul>
				<li>
					<input class="ChartValuesFiles-selector" type="checkbox" checked disabled/>
					<span class="ChartValuesFiles-alias">front-end</span>
					<span class="ChartValuesFiles-file">simple-deploy/values.schema.json</span>
				</li>
				<li>
					<input class="ChartValuesFiles-selector" type="checkbox" checked disabled/>
					<span class="ChartValuesFiles-alias">back-end</span>
					<span class="ChartValuesFiles-file">simple-deploy/values.schema.json</span>
				</li>
				<li>
					<input class="ChartValuesFiles-selector" type="checkbox" checked disabled/>
					<span class="ChartValuesFiles-alias">proxy</span>
					<span class="ChartValuesFiles-file">proxymity/values.schema.json</span>
				</li>
				<li>
					<input class="ChartValuesFiles-selector" type="checkbox" checked disabled/>
					<span class="ChartValuesFiles-alias">netpols</span>
					<span class="ChartValuesFiles-file">packet-guardian/values.schema.json</span>
				</li>
			</ul>

			<h3>From dependencies default values</h3>
			<ul>
				<li>
					<input class="ChartValuesFiles-selector" type="checkbox" checked disabled/>
					<span class="ChartValuesFiles-alias">front-end</span>
					<span class="ChartValuesFiles-file">simple-deploy/values.yaml</span>
				</li>
				<li>
					<input class="ChartValuesFiles-selector" type="checkbox" checked disabled/>
					<span class="ChartValuesFiles-alias">back-end</span>
					<span class="ChartValuesFiles-file">simple-deploy/values.yaml</span>
				</li>
				<li>
					<input class="ChartValuesFiles-selector" type="checkbox" checked disabled/>
					<span class="ChartValuesFiles-alias">proxy</span>
					<span class="ChartValuesFiles-file">proxymity/values.yaml</span>
				</li>
				<li>
					<input class="ChartValuesFiles-selector" type="checkbox" checked disabled/>
					<span class="ChartValuesFiles-alias">netpols</span>
					<span class="ChartValuesFiles-file">packet-guardian/values.yaml</span>
				</li>
			</ul>

			<h3>From chart schema</h3>
			<ul>
				<li>
					<input class="ChartValuesFiles-selector" type="checkbox" checked disabled/>
					<span class="ChartValuesFiles-file">values.schmea.json</span>
				</li>
			</ul>

			<h3>From chart default values</h3>
			<ul>
				<li>
					<input class="ChartValuesFiles-selector" type="checkbox" checked disabled/>
					<span class="ChartValuesFiles-file">values.yaml</span>
				</li>
			</ul>

			<h3>Overlays</h3>
			<input class="ChartValuesFiles-pattern" type="search" value="values/**.yaml"/>
			<ul>
				<li>
					<span class="ChartValuesFiles-grip"></span>
					<input class="ChartValuesFiles-selector" type="checkbox" checked/>
					<span class="ChartValuesFiles-file">values/eu/all.yaml</span>
				</li>
				<li>
					<span class="ChartValuesFiles-grip"></span>
					<input class="ChartValuesFiles-selector" type="checkbox"/>
					<span class="ChartValuesFiles-file">values/eu/dev.yaml</span>
				</li>
				<li>
					<span class="ChartValuesFiles-grip"></span>
					<input class="ChartValuesFiles-selector" type="checkbox"/>
					<span class="ChartValuesFiles-file">values/eu/qa.yaml</span>
				</li>
				<li>
					<span class="ChartValuesFiles-grip"></span>
					<input class="ChartValuesFiles-selector" type="checkbox" checked/>
					<span class="ChartValuesFiles-file">values/eu/prod/all.yaml</span>
				</li>
				<li>
					<span class="ChartValuesFiles-grip"></span>
					<input class="ChartValuesFiles-selector" type="checkbox" checked/>
					<span class="ChartValuesFiles-file">values/eu/prod/a.yaml</span>
				</li>
				<li>
					<span class="ChartValuesFiles-grip"></span>
					<input class="ChartValuesFiles-selector" type="checkbox"/>
					<span class="ChartValuesFiles-file">values/eu/prod/b.yaml</span>
				</li>
				<li>
					<span class="ChartValuesFiles-grip"></span>
					<input class="ChartValuesFiles-selector" type="checkbox"/>
					<span class="ChartValuesFiles-file">values/us/all.yaml</span>
				</li>
				<li>
					<span class="ChartValuesFiles-grip"></span>
					<input class="ChartValuesFiles-selector" type="checkbox"/>
					<span class="ChartValuesFiles-file">values/us/qa.yaml</span>
				</li>
				<li>
					<span class="ChartValuesFiles-grip"></span>
					<input class="ChartValuesFiles-selector" type="checkbox"/>
					<span class="ChartValuesFiles-file">values/us/prod.yaml</span>
				</li>
			</ul>
		</div>
	</div>

	<div class="Table">
		<table>
			<thead>
				<tr>
					<th class="columnheader-rowheader" role="columnheader">Keys \ Values files</th>
					<th class="TableHeaderValuesFiles" role="columnheader">
						<ul>
							<li>
								<span class="TableHeaderValuesFiles-alias">front-end</span>
								<span class="TableHeaderValuesFiles-file">simple-deploy/values.yaml</span>
							</li>
						</ul>
						<ul>
							<li>
								<span class="TableHeaderValuesFiles-alias">back-end</span>
								<span class="TableHeaderValuesFiles-file">simple-deploy/values.yaml</span>
							</li>
						</ul>
						<ul>
							<li>
								<span class="TableHeaderValuesFiles-alias">proxy</span>
								<span class="TableHeaderValuesFiles-file">proxymity/values.yaml</span>
							</li>
						</ul>
						<ul>
							<li>
								<span class="TableHeaderValuesFiles-alias">netpols</span>
								<span class="TableHeaderValuesFiles-file">packet-guardian/values.yaml</span>
							</li>
						</ul>
					</th>
					<th class="TableHeaderValuesFiles" role="columnheader">
						<span class="TableHeaderValuesFiles-file">values.yaml</span>
					</th>
					<th class="TableHeaderValuesFiles" role="columnheader">
						<span class="TableHeaderValuesFiles-file">values/eu/all.yaml</span>
					</th>
					<th class="TableHeaderValuesFiles" role="columnheader">
						<span class="TableHeaderValuesFiles-file">values/eu/prod/all.yaml</span>
					</th>
					<th class="TableHeaderValuesFiles" role="columnheader">
						<span class="TableHeaderValuesFiles-file">values/eu/prod/a.yaml</span>
					</th>
				</tr>
			</thead>

			<tbody class="TableRows">
				<tr>
					<td role="rowheader">
						<span class="TableRows-valuesKeyGrip"></span>
						<input class="TableRows-valuesKeyExpander" type="checkbox" checked/>
						<pre class="TableRows-valuesKeyLabel">front-end</pre>
					</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td role="rowheader">
						<span class="TableRows-valuesKeyGrip"></span>
						<input class="TableRows-valuesKeyExpander" type="checkbox" checked/>
						<pre class="TableRows-valuesKeyLabel">  mainContainer</pre>
					</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td role="rowheader">
						<span class="TableRows-valuesKeyGrip"></span>
						<input class="TableRows-valuesKeyExpander" type="checkbox" checked/>
						<pre class="TableRows-valuesKeyLabel">    image</pre>
					</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td role="rowheader">
						<span class="TableRows-valuesKeyGrip"></span>
						<input class="TableRows-valuesKeyExpander" type="checkbox" checked/>
						<pre class="TableRows-valuesKeyLabel">      registry</pre>
					</td>
					<td><textarea class="ValueField" value="docker.io"></textarea></td>
					<td><textarea class="ValueField" placeholder="docker.io"></textarea></td>
					<td><textarea class="ValueField" placeholder="docker.io"></textarea></td>
					<td><textarea class="ValueField" placeholder="docker.io"></textarea></td>
					<td><textarea class="ValueField" placeholder="docker.io"></textarea></td>
				</tr>
				<tr>
					<td role="rowheader">
						<span class="TableRows-valuesKeyGrip"></span>
						<input class="TableRows-valuesKeyExpander" type="checkbox" checked/>
						<pre class="TableRows-valuesKeyLabel">      repository</pre>
					</td>
					<td><textarea class="ValueField" value="alpine/alpine"></textarea></td>
					<td><textarea class="ValueField" placeholder="alpine/alpine"></textarea></td>
					<td><textarea class="ValueField" placeholder="alpine/alpine"></textarea></td>
					<td><textarea class="ValueField" placeholder="alpine/alpine"></textarea></td>
					<td><textarea class="ValueField" placeholder="alpine/alpine"></textarea></td>
				</tr>
				<tr>
					<td role="rowheader">
						<span class="TableRows-valuesKeyGrip"></span>
						<input class="TableRows-valuesKeyExpander" type="checkbox" checked/>
						<pre class="TableRows-valuesKeyLabel">      tag</pre>
					</td>
					<td><textarea class="ValueField" value="1.2.3"></textarea></td>
					<td><textarea class="ValueField" placeholder="1.2.3"></textarea></td>
					<td><textarea class="ValueField" placeholder="1.2.3"></textarea></td>
					<td><textarea class="ValueField" placeholder="1.2.3"></textarea></td>
					<td><textarea class="ValueField" placeholder="1.2.3"></textarea></td>
				</tr>
				<tr>
					<td role="rowheader">
						<span class="TableRows-valuesKeyGrip"></span>
						<input class="TableRows-valuesKeyExpander" type="checkbox" checked/>
						<pre class="TableRows-valuesKeyLabel">  replicas</pre>
					</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td role="rowheader">
						<span class="TableRows-valuesKeyGrip"></span>
						<input class="TableRows-valuesKeyExpander" type="checkbox" checked/>
						<pre class="TableRows-valuesKeyLabel">    enabled</pre>
					</td>
					<td><textarea class="ValueField" value="Constant"></textarea></td>
					<td><textarea class="ValueField" placeholder="Constant"></textarea></td>
					<td><textarea class="ValueField" placeholder="Constant"></textarea></td>
					<td><textarea class="ValueField" placeholder="Constant"></textarea></td>
					<td><textarea class="ValueField" placeholder="Constant"></textarea></td>
				</tr>
				<tr>
					<td role="rowheader">
						<span class="TableRows-valuesKeyGrip"></span>
						<input class="TableRows-valuesKeyExpander" type="checkbox" checked/>
						<pre class="TableRows-valuesKeyLabel">    constant</pre>
					</td>
					<td><input class="ValueField" type="number" value="5"/></td>
					<td><input class="ValueField" type="number" placeholder="5" /></td>
					<td><input class="ValueField" type="number" placeholder="5" /></td>
					<td><input class="ValueField" type="number" placeholder="5" /></td>
					<td><input class="ValueField" type="number" placeholder="5" /></td>
				</tr>
				<tr>
					<td role="rowheader">
						<span class="TableRows-valuesKeyGrip"></span>
						<input class="TableRows-valuesKeyExpander" type="checkbox" checked/>
						<pre class="TableRows-valuesKeyLabel">    autoscaler</pre>
					</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td role="rowheader">
						<span class="TableRows-valuesKeyGrip"></span>
						<input class="TableRows-valuesKeyExpander" type="checkbox" checked/>
						<pre class="TableRows-valuesKeyLabel">      min</pre>
					</td>
					<td><input class="ValueField" type="number" value="2" /></td>
					<td><input class="ValueField" type="number" placeholder="2" /></td>
					<td><input class="ValueField" type="number" placeholder="2" /></td>
					<td><input class="ValueField" type="number" placeholder="2" /></td>
					<td><input class="ValueField" type="number" placeholder="2" /></td>
				</tr>
				<tr>
					<td role="rowheader">
						<span class="TableRows-valuesKeyGrip"></span>
						<input class="TableRows-valuesKeyExpander" type="checkbox" checked/>
						<pre class="TableRows-valuesKeyLabel">      max</pre>
					</td>
					<td><input class="ValueField" type="number" value="10" /></td>
					<td><input class="ValueField" type="number" placeholder="10" /></td>
					<td><input class="ValueField" type="number" placeholder="10" /></td>
					<td><input class="ValueField" type="number" placeholder="10" /></td>
					<td><input class="ValueField" type="number" placeholder="10" /></td>
				</tr>
				<tr>
					<td role="rowheader">
						<span class="TableRows-valuesKeyGrip"></span>
						<input class="TableRows-valuesKeyExpander" type="checkbox" checked/>
						<pre class="TableRows-valuesKeyLabel">  service</pre>
					</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td role="rowheader">
						<span class="TableRows-valuesKeyGrip"></span>
						<input class="TableRows-valuesKeyExpander" type="checkbox" checked/>
						<pre class="TableRows-valuesKeyLabel">    ports</pre>
					</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td role="rowheader">
						<span class="TableRows-valuesKeyGrip"></span>
						<input class="TableRows-valuesKeyExpander" type="checkbox" checked/>
						<pre class="TableRows-valuesKeyLabel">      http</pre>
					</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td role="rowheader">
						<span class="TableRows-valuesKeyGrip"></span>
						<input class="TableRows-valuesKeyExpander" type="checkbox" checked/>
						<pre class="TableRows-valuesKeyLabel">        containerPort</pre>
					</td>
					<td><input class="ValueField" type="number" value="5000"/></td>
					<td><input class="ValueField" type="number" placeholder="5000"/></td>
					<td><input class="ValueField" type="number" placeholder="5000"/></td>
					<td><input class="ValueField" type="number" placeholder="5000"/></td>
					<td><input class="ValueField" type="number" placeholder="5000"/></td>
				</tr>
				<tr>
					<td role="rowheader">
						<span class="TableRows-valuesKeyGrip"></span>
						<input class="TableRows-valuesKeyExpander" type="checkbox" checked/>
						<pre class="TableRows-valuesKeyLabel">        servicePort</pre>
					</td>
					<td><input class="ValueField" type="number" value="80"/></td>
					<td><input class="ValueField" type="number" placeholder="80"/></td>
					<td><input class="ValueField" type="number" placeholder="80"/></td>
					<td><input class="ValueField" type="number" placeholder="80"/></td>
					<td><input class="ValueField" type="number" placeholder="80"/></td>
				</tr>
				<tr>
					<td role="rowheader">
						<span class="TableRows-valuesKeyGrip"></span>
						<input class="TableRows-valuesKeyExpander" type="checkbox" checked/>
						<pre class="TableRows-valuesKeyLabel">        protocol</pre>
					</td>
					<td><textarea class="ValueField" value="TCP"></textarea></td>
					<td><textarea class="ValueField" placeholder="TCP"></textarea></td>
					<td><textarea class="ValueField" placeholder="TCP"></textarea></td>
					<td><textarea class="ValueField" placeholder="TCP"></textarea></td>
					<td><textarea class="ValueField" placeholder="TCP"></textarea></td>
				</tr>
				<tr>
					<td role="rowheader">
						<span class="TableRows-valuesKeyGrip"></span>
						<input class="TableRows-valuesKeyExpander" type="checkbox"/>
						<pre class="TableRows-valuesKeyLabel">back-end</pre>
					</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td role="rowheader">
						<span class="TableRows-valuesKeyGrip"></span>
						<input class="TableRows-valuesKeyExpander" type="checkbox" checked/>
						<pre class="TableRows-valuesKeyLabel">proxy</pre>
					</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td role="rowheader">
						<span class="TableRows-valuesKeyGrip"></span>
						<input class="TableRows-valuesKeyExpander" type="checkbox" checked/>
						<pre class="TableRows-valuesKeyLabel">  enabled</pre>
					</td>
					<td><input class="ValueField" type="checkbox" checked /></td>
					<td><input class="ValueField" type="checkbox" checked /></td>
					<td><input class="ValueField" type="checkbox" checked /></td>
					<td><input class="ValueField" type="checkbox" checked /></td>
					<td><input class="ValueField" type="checkbox" checked /></td>
				</tr>
				<tr>
					<td role="rowheader">
						<span class="TableRows-valuesKeyGrip"></span>
						<input class="TableRows-valuesKeyExpander" type="checkbox" checked/>
						<pre class="TableRows-valuesKeyLabel">netpols</pre>
					</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td role="rowheader">
						<span class="TableRows-valuesKeyGrip"></span>
						<input class="TableRows-valuesKeyExpander" type="checkbox" checked/>
						<pre class="TableRows-valuesKeyLabel">  enabled</pre>
					</td>
					<td>
						<input class="ValueField" type="checkbox"/>
						<select>
							<option>undefined</option>
							<option>null</option>
							<option>boolean</option>
							<option>number</option>
							<option>string</option>
							<option>" string</option>
							<option>' string</option>
							<option>| string</option>
							<option>|- string</option>
							<option>&gt; string</option>
							<option>&gt;- string</option>
							<option>list</option>
							<option>dict</option>
						</select>
					</td>
					<td><input class="ValueField" type="checkbox"/></td>
					<td><input class="ValueField" type="checkbox"/></td>
					<td><input class="ValueField" type="checkbox"/></td>
					<td><input class="ValueField" type="checkbox"/></td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

<style>
	.Main {
		display: grid;
		grid-template-columns: max-content auto;
  	grid-template-rows: 100%;
		grid-template-areas: "sidebar table";
		width: 100%;
		height: 100%;
		overflow: hidden;

	}

	.Sidebar {
		background-color: color-mix(in srgb, var(--BG-COLOR), black 10%);
		overflow: auto;
	}

	.Sidebar p {
		max-width: 300px;
	}

	.ChartMeta {
		padding: 10px;
	}

	.ChartMeta-apiVersion {
		display: block;
		font-size: 0.8em;
	}

	.ChartMeta-type {
		display: block;
		font-size: 0.8em;
	}

	.ChartMeta-name {
		display: block;
		font-size: 1.5em;
	}

	.ChartDependencies {
		padding: 10px;
	}

	.ChartDependencies h2 {
		font-size: 1.5em;
		margin-bottom: 5px;
	}

	.ChartDependencies ul {
		list-style-type: none;
	}

	.ChartDependencies-alias::before {
		content: "\2013";
		margin-right: 0.5em;
	}

	.ChartDependencies-alias {
		font-family: monospace;
	}

	.ChartDependencies-subChart::before {
		content: "\2192";
		margin-right: 0.5em;
	}

	.ChartDependencies-subChart {}

	.ChartValuesFiles {
		padding: 10px;
	}

	.ChartValuesFiles h2 {
		font-size: 1.5em;
		margin-bottom: 5px;
	}

	.ChartValuesFiles h3 {
		font-size: 1.25em;
		margin-top: 10px;
		margin-bottom: 5px;
	}

	.ChartValuesFiles ul {
		list-style: none;
	}

	.ChartValuesFiles-grip {
		display: inline-block;
		width: 16px;
		height: 16px;
		background-image: url("/icons/ui-grip.svg");
		vertical-align: middle;
		margin-top: -0.2em;
		cursor: grab;
	}

	input[type="checkbox"].ChartValuesFiles-selector {
		width: 0px;
		height: 0px;
		margin-right: 16px;
	}

	input[type="checkbox"].ChartValuesFiles-selector::before {
		content: "";
		display: inline-block;
		width: 16px;
		height: 16px;
		user-select: none;
		vertical-align: middle;
		margin-top: -0.2em;
		background-image: url("/icons/checkbox-square.svg");
		cursor: pointer;
	}

	input[type="checkbox"].ChartValuesFiles-selector:checked::before {
		background-image: url("/icons/checkbox-square-checked.svg");
	}

	input[type="checkbox"].ChartValuesFiles-selector:disabled::before {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.ChartValuesFiles-alias {
		font-family: monospace;
	}

	.ChartValuesFiles-alias::after {
		font-family: initial;
		content: "\2192";
		margin-left: 0.5em;
	}

	.ChartValuesFiles-file {
		font-family: monospace;
	}

	input[type="search"].ChartValuesFiles-pattern {
		width: 100%;
		margin-bottom: 5px;
		font-family: monospace;
		padding: 5px 10px;
	}

	.Table {
		background: color-mix(in srgb, var(--BG-COLOR), black 0%);
		overflow: auto;
	}

	.Table table {
		border-collapse: collapse;
	}

	.Table th,
	.Table td {
		border: 1px solid color-mix(in srgb, var(--BG-COLOR), black 20%);
	}

	.Table th[role="columnheader"].TableHeaderValuesFiles {
		min-width: 300px;
		white-space: nowrap;
		text-align: left;
	}

	.Table th[role="columnheader"] {
		vertical-align: bottom;
		position: sticky;
		top: 0;
		background: color-mix(in srgb, var(--BG-COLOR), black 0%);
		padding: 10px;
	}

	.Table th.columnheader-rowheader {
		text-align: right;
		top: 0;
		left: 0;
		z-index: 500;
	}

	.Table td[role="rowheader"] {
		min-width: 200px;
		white-space: nowrap;
		position: sticky;
		left: 0;
		background: color-mix(in srgb, var(--BG-COLOR), black 0%);
		vertical-align: top;
	}

	.TableHeaderValuesFiles {}

	.TableHeaderValuesFiles-alias {
		font-family: monospace;
	}

	.TableHeaderValuesFiles-alias::after {
		content: " \2192";
		font-family: initial;
	}

	.TableHeaderValuesFiles-file {
		font-family: monospace;
	}

	.TableRows {}

	.TableRows-valuesKeyGrip {
		display: inline-block;
		width: 16px;
		height: 16px;
		background-image: url("/icons/ui-grip.svg");
		vertical-align: middle;
		margin-top: -0.2em;
		cursor: grab;
	}

	input[type="checkbox"].TableRows-valuesKeyExpander {
		width: 0px;
		height: 0px;
		margin-right: 16px;
	}

	input[type="checkbox"].TableRows-valuesKeyExpander::before {
		content: "";
		display: inline-block;
		width: 16px;
		height: 16px;
		user-select: none;
		vertical-align: middle;
		margin-top: -0.2em;
		background-image: url("/icons/checkbox-expand.svg");
		cursor: pointer;
	}

	input[type="checkbox"].TableRows-valuesKeyExpander:checked::before {
		background-image: url("/icons/checkbox-expand-checked.svg");
	}

	input[type="checkbox"].TableRows-valuesKeyExpander:disabled::before {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.TableRows-valuesKeyLabel {
		display: inline;
		font-family: monospace;
		white-space: pre;
	}

	input[type="checkbox"].ValueField {
		display: block;
		width: 100%;
		height: 17px;
		cursor: pointer;
		margin-top: -1px;
	}

	input[type="checkbox"].ValueField::before {
		content: "";
		background-color: color-mix(in srgb, var(--BG-COLOR), black 10%);
		background-image: url("/icons/bool-true.svg");
		background-repeat: no-repeat;
		background-position: center;
		display: inline-block;
		width: 50%;
		height: 100%;
	}

	input[type="checkbox"].ValueField::after {
		content: "";
		background-color: coral;
		background-image: url("/icons/bool-false.svg");
		background-repeat: no-repeat;
		background-position: center;
		display: inline-block;
		width: 50%;
		height: 100%;
	}

	input[type="checkbox"].ValueField:checked::before {
		background-color: yellowgreen;
	}

	input[type="checkbox"].ValueField:checked::after {
		background-color: color-mix(in srgb, var(--BG-COLOR), black 10%);
	}

	input[type="number"].ValueField {
		display: block;
		width: 100%;
		height: 16px;
		text-align: right;
		font-family: monospace;
		border: none;
		background-color: gold;
	}

	input[type="number"].ValueField:placeholder-shown {
		background-color: lightgoldenrodyellow;
	}

	textarea.ValueField {
		display: block;
		width: 100%;
		height: 16px;
		font-family: monospace;
		border: none;
		background-color: deepskyblue;
	}

	textarea.ValueField:placeholder-shown {
		background-color: lightblue;
	}
</style>
