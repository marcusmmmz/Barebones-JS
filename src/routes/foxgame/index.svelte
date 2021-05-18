<script lang="ts">
	// TODO: use quadtree
	import { InputMap } from "$lib/engine/input";
	import { fruits, score, level } from "./stores";
	import { Vec2 } from "$lib/engine/utils";
	import Canvas from "$lib/Canvas.svelte";
	import Layer from "$lib/Layer.svelte";
	import Text from "$lib/Text.svelte";
	import Player from "./Player.svelte";
	import Enemy from "./Enemy.svelte";
	import Fruit from "./Fruit.svelte";

	InputMap.addAction("up", ["ArrowUp", "w"]);
	InputMap.addAction("left", ["ArrowLeft", "a"]);
	InputMap.addAction("down", ["ArrowDown", "s"]);
	InputMap.addAction("right", ["ArrowRight", "d"]);

	$: if ($fruits.length == 0) {
		$level++;
		fruits.spawn(4 + $level);
	}
</script>

<Canvas size={Vec2(500, 500)}>
	<Layer name="game">
		<Player />
		<Enemy />
		{#each $fruits as fruit}
			<Fruit pos={fruit} />
		{/each}
	</Layer>
	<Layer name="ui">
		<Text pos={Vec2(50, 50)} text="Score: {$score}" />
		<Text pos={Vec2(50, 70)} text="Level: {$level}" />
	</Layer>
</Canvas>

<style>
	:global(#app) {
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 100vw;
		height: 100vh;
	}

	:global(html, body) {
		background: rgb(29, 29, 29);
		color: white;
		margin: 0;
		padding: 0;
		text-align: center;
	}
</style>
