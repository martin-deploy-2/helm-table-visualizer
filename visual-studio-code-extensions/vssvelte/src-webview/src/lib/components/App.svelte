<script lang="ts">
  import Table from "./Table.svelte"
  import vscode from "../utilities/vscode"

  type Message =
    | InitMessage
    | EditMessage

  interface InitMessage {
    type: "Init"
    chartFolder: string
    chartName: string
    valuesFiles: Array<{
      path: string
      data: any
    }>
  }

  interface EditMessage {
    type: "Edit"
    valuesFilePath: string
    newData: any
  }

  interface State {
    chartFolder: string
    chartName: string
    valuesFiles: Array<{
      toggled: boolean
      path: string
      data: any
    }>
  }

  let state = vscode.getState<State>() ?? {
    chartFolder: "(No chart)",
    chartName: "(No chart)",
    valuesFiles: []
  }

  $: vscode.setState(state)

  function onMessage({ data: message }: { data: Message }) {
    switch (message.type) {
      case "Init": onInitMessage(message); break
      case "Edit": onEditMessage(message); break
    }
  }

  function onInitMessage(message: InitMessage) {
    let nextState: State = message as any

    for (let v of nextState.valuesFiles) {
      v.toggled = v.path.endsWith("/values.yaml")
    }

    state = nextState
  }

  function onEditMessage(message: EditMessage) {
    const found = state.valuesFiles.find(v => v.path == message.valuesFilePath)

    if (found) {
      found.data = message.newData
      state = state
    }
  }

  let dragged: number = -1

  function onMouseDown(i: number) {
    dragged = i
  }

  function onMouseUp(i: number) {
    if (dragged != -1 && i != -1) {
      if (dragged < i) --i
      state.valuesFiles.splice(i, 0, state.valuesFiles.splice(dragged, 1)[0])
      state.valuesFiles = state.valuesFiles
    }

    dragged = -1
  }
</script>

<svelte:window on:message={onMessage}/>
<svelte:document on:mouseup|preventDefault={() => onMouseUp(-1)} />

<div>Chart folder: {state.chartFolder}</div>
<div>Chart name: {state.chartName}</div>
<ul class="Items {dragged != -1 ? "_dragging" : ""}">
  {#each state.valuesFiles as v, i}
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <li class="Item {i == dragged ? "_dragged" : ""}" on:mouseup|preventDefault={() => onMouseUp(i)}>
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <span class="Item-grip" on:mousedown|preventDefault={() => onMouseDown(i)}></span>
      <label>
        <input type="checkbox" bind:checked={v.toggled}/>
        <code>{v.path}</code>
      </label>
    </li>
  {/each}
</ul>

<Table valuesFiles={state.valuesFiles}/>

<style>
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
</style>
