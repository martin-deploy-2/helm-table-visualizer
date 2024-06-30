<script lang="ts">
  import { Container, Icon, Input, Styles } from "@sveltestrap/sveltestrap"

	let darkTheme = true
</script>

<Styles theme={darkTheme ? "dark" : "light"} />

<Container fluid>
	<h1>Coucou, <Icon name="globe-europe-africa" />!</h1>
	<Input type="switch" label="Dark theme" bind:checked={darkTheme} />
</Container>
