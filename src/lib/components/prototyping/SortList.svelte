<script lang="ts">
	let items = [
		{ label: "Zero" },
		{ label: "One" },
		{ label: "Two" },
		{ label: "Three" },
		{ label: "Four" },
		{ label: "Five" },
		{ label: "Six" },
		{ label: "Seven" },
	]

	let dragged: number = -1

	function onMouseDown(i: number) {
		dragged = i
	}

	function onMouseUp(i: number) {
		if (dragged != -1 && i != -1) {
			if (dragged < i) --i
			items.splice(i, 0, items.splice(dragged, 1)[0])
			items = items
		}

		dragged = -1
	}
</script>

<p>
	Dragged: {dragged}
</p>

<svelte:document on:mouseup|preventDefault={() => onMouseUp(-1)} />

<ul class="Items {dragged != -1 ? "_dragging" : ""}">
	{#each items as item, i}
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<li class="Item {i == dragged ? "_dragged" : ""}" on:mouseup|preventDefault={() => onMouseUp(i)}>
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<span class="Item-grip" on:mousedown|preventDefault={() => onMouseDown(i)}></span>
			<span class="Item-label">{item.label}</span>
		</li>
	{/each}
</ul>

<style>
	.Items {
		padding: 40px 80px;
	}

	.Items._dragging .Item:hover {
		box-shadow: 0 2px 0 0 deepskyblue inset;
	}

	.Item {
		padding: 2px 4px;
	}

	.Item._dragged {
		opacity: 0.5;
	}

	.Item-grip {
		display: inline-block;
		width: 16px;
		height: 16px;
		background: silver;
		vertical-align: middle;
		margin-top: -2px;
		cursor: grab;
	}

	.Item-label {
	}
</style>
