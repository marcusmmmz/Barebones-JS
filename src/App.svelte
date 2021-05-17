<script>
	import { Router, Route } from "svelte-routing";
	import Home from "./routes/index.svelte";
	import Foxgame from "./routes/foxgame/index.svelte";
	import Langton from "./routes/langton/index.svelte";

	export let url = "";
</script>

<Router {url}>
	<Route path="/" component={Home} />
	<Route path="foxgame" component={Foxgame} />
	<Route path="langton" component={Langton} />
</Router>
