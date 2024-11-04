<script>
	import { onMount } from "svelte";
	import {
		AxisScrollStrategies,
		disableThemeEffects,
		lightningChart,
	} from "@arction/lcjs";
	import { basicTheme } from "../lib/chartTheme";

	export let data = {};
	export let title = "";
	export let nameMap = {};
	export let showLegend = false;
	export let showJust = null;

	let lineSeries = {};

	let chartElem;
	let chart;
	let legendbox;
	console.log(data)
	function animFrame() {
		Object.keys(
			showJust && data[showJust] ? { [showJust]: data[showJust] } : data,
		).forEach((dataset) => {
			if (!lineSeries[dataset]) {
				lineSeries[dataset] = chart
					.addLineSeries({
						// Optimize line series for progressively increasing X coordinates.
						dataPattern: { pattern: "ProgressiveX" },
					})
					.setName(nameMap[dataset] || dataset);
				if (showLegend) legendbox.add(lineSeries[dataset]);
			}
			lineSeries[dataset]
				// .clear()
				.add(
					data[dataset]
						.slice(lineSeries[dataset].getPointAmount())
						.map((y, i) => ({
							x: i + lineSeries[dataset].getPointAmount(),
							y,
						})),
				);
		});
		requestAnimationFrame(animFrame);
	}

	onMount(() => {
		// console.log('hi')
		chart = lightningChart()
			.ChartXY({ container: chartElem, theme: disableThemeEffects(basicTheme) })
			.setTitle(title);
		if (showLegend) legendbox = chart.addLegendBox().add(chart);
		chart
			.getDefaultAxisX()
			.setScrollStrategy(AxisScrollStrategies.progressive)
			.setInterval({
				start: 0,
				end: 400, // 60 seconds as milliseconds
				stopAxisAfter: false,
			});
		animFrame();
		return () => {
			chart.dispose();
		};
	});
</script>

<div class="chart" bind:this={chartElem} />
