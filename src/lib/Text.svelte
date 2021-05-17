<script lang="ts" context="module">
	export const prerender = false;
	export const ssr = false;
</script>

<script lang="ts">
	import { Vec2 } from "$lib/engine/utils";
	import { ctx } from "$lib/engine/graphics";
	import { onUpdate } from "$lib/engine/main";

	export let color = "hsl(0, 0%, 100%)";
	export let align: CanvasTextAlign = "center";
	export let baseline: CanvasTextBaseline = "middle";

	export let text = "";
	export let pos = Vec2();

	export let fontSize: string | number = 16;
	export let fontFamily =
		'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica';

	onUpdate(() => {
		if (text) {
			// const ctx = getCtx();
			ctx.fillStyle = color;
			ctx.font = `${fontSize}px ${fontFamily}`;
			ctx.textAlign = align;
			ctx.textBaseline = baseline;
			ctx.fillText(text, pos.x, pos.y);
		}
	});
</script>

<slot />
