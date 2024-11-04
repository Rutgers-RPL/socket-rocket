import {
	ColorRGBA,
	SolidFill,
	SolidLine,
	FontSettings,
	VisibleTicks,
	emptyLine,
	NumericTickStrategy,
	emptyTick,
	DateTimeTickStrategy,
	TimeTickStrategy,
	DashedLine,
	StipplePatterns,
	isVisibleTicks,
	emptyFill,
	transparentFill,
	PointStyle3D,
} from "@arction/lcjs";

var colorMissing = ColorRGBA(0, 255, 0);
var StylePalette = function (array, clbk) {
	var values = array.map(clbk);
	return function (i) {
		return values[i % values.length];
	};
};
/**
 * Factory function for creating a LightningChart JS Theme with a flat style based on very minimal configuration options.
 *
 * No-code interface for this factory can be found at https://arction.github.io/lcjs-themes/
 *
 * Pre-built versions generated using this factory can be found in this library:
 *
 * - `flatThemeDark` https://github.com/Arction/lcjs-themes/blob/main/src/flatThemeDark.ts
 * - `flatThemeLight` https://github.com/Arction/lcjs-themes/blob/main/src/flatThemeLight.ts
 *
 * @param   options - Configuration options for the created theme.
 * @returns LightningChart JS `Theme` object.
 */
var makeFlatTheme = function (options) {
	var fontWeight = options.fontWeight || "normal";
	var fontStyle = options.fontStyle || "normal";

	var whiteFillStyle = new SolidFill({
		color: ColorRGBA(255, 255, 255),
	});
	var blackFillStyle = new SolidFill({
		color: ColorRGBA(0, 0, 0),
	});
	//
	//
	//
	var isDark = options.isDark !== undefined ? options.isDark : true;
	var lcjsBackgroundFillStyle = new SolidFill({
		color: options.backgroundColor,
	});
	var highlightColorOffset = isDark
		? ColorRGBA(60, 60, 60, 60)
		: ColorRGBA(-60, -60, -60, 60);
	var highlightColorOffsetAxisOverlay = isDark
		? ColorRGBA(255, 255, 255, 40)
		: ColorRGBA(0, 0, 0, 40);
	var dashboardSplitterStyle = new SolidLine({
		thickness: 4,
		fillStyle: new SolidFill({
			color: options.dashboardSplitterColor || colorMissing,
		}),
	});
	var chartBackgroundFillStyle = lcjsBackgroundFillStyle;
	var seriesBackgroundFillStyle = transparentFill;
	var fontChartTitles = new FontSettings({
		size: 18,
		family: options.fontFamily,
		weight: fontWeight,
		style: fontStyle,
	});
	var fontAxisTitles = new FontSettings({
		size: 16,
		family: options.fontFamily,
		weight: fontWeight,
		style: fontStyle,
	});
	var fontLegendTitle = new FontSettings({
		size: 14,
		family: options.fontFamily,
		weight: fontWeight,
		style: fontStyle,
	});
	var fontOther = new FontSettings({
		size: 14,
		family: options.fontFamily,
		weight: fontWeight,
		style: fontStyle,
	});
	var textFillStyle = new SolidFill({
		color: options.textColor,
	});
	var zoomRectangleFillStyle = new SolidFill({
		color: isDark ? ColorRGBA(255, 255, 255, 20) : ColorRGBA(0, 0, 0, 20),
	});
	var zoomRectangleStrokeStyle = new SolidLine({
		thickness: 1,
		fillStyle: isDark ? whiteFillStyle : blackFillStyle,
	});
	var primaryDataFillStyle = new SolidFill({
		color: options.dataColors[0],
	});
	var dataSolidFillPalette = StylePalette(options.dataColors, function (color) {
		return new SolidFill({
			color: color,
		});
	});
	var dataSolidLinePalette = StylePalette(options.dataColors, function (color) {
		return new SolidLine({
			fillStyle: new SolidFill({
				color: color,
			}),
			thickness: 2,
		});
	});
	var dataAreaSolidFillPalette = StylePalette(
		options.dataColors,
		function (color) {
			return new SolidFill({
				color: color.setA(100),
			});
		}
	);
	var seriesStrokeStylePalette = dataSolidLinePalette;
	var seriesFillStylePalette = dataSolidFillPalette;
	var areaSeriesFillStylePalette = dataAreaSolidFillPalette;
	var dataBorderStrokePalette = dataSolidLinePalette;
	var pointSeries3DPointStylePalette = StylePalette(
		options.dataColors,
		function (color) {
			return new PointStyle3D.Triangulated({
				shape: "sphere",
				size: 10,
				fillStyle: new SolidFill({
					color: color,
				}),
			});
		}
	);
	var pointCloudSeries3DPointStylePalette = StylePalette(
		options.dataColors,
		function (color) {
			return new PointStyle3D.Pixelated({
				size: 5,
				fillStyle: new SolidFill({
					color: color,
				}),
			});
		}
	);
	var dataFillStylePositive = new SolidFill({
		color: ColorRGBA(176, 255, 157),
	});
	var dataFillStyleNegative = new SolidFill({
		color: ColorRGBA(255, 112, 76),
	});
	var wireframeStyle = new SolidLine({
		thickness: 1,
		fillStyle: blackFillStyle,
	});
	var axisStrokeStyle = new SolidLine({
		thickness: 1,
		fillStyle: new SolidFill({
			color: options.axisColor,
		}),
	});
	var axisOverlayStyle = new SolidFill({
		color: ColorRGBA(0, 0, 0, 1),
	}); // NOTE: Slight opaqueness is required for this overlay becoming visible when highlighted.
	var tickStyle = new VisibleTicks({
		gridStrokeStyle: new SolidLine({
			thickness: 1,
			fillStyle: new SolidFill({
				color: options.gridLineColor,
			}),
		}),
		tickStyle: emptyLine,
		tickLength: 7,
		tickPadding: 0,
		labelFont: fontOther,
		labelPadding: 0,
		labelFillStyle: textFillStyle,
	});
	var numericTickStrategy = new NumericTickStrategy({
		extremeTickStyle: emptyTick,
		majorTickStyle: tickStyle,
		minorTickStyle: tickStyle,
	});
	var dateTimeTickStrategy = new DateTimeTickStrategy({
		greatTickStyle: tickStyle.setTickLength(50).setTickPadding(-14),
		majorTickStyle: tickStyle,
		minorTickStyle: tickStyle,
	});
	var timeTickStrategy = new TimeTickStrategy({
		majorTickStyle: tickStyle,
		minorTickStyle: tickStyle,
	});
	var cursorGridStrokeStyle = new DashedLine({
		thickness: 1,
		fillStyle: isDark ? whiteFillStyle : blackFillStyle,
		pattern: StipplePatterns.DashedEqual,
		patternScale: 3,
	});
	var bandFillStyle = zoomRectangleFillStyle;
	var bandStrokeStyle = zoomRectangleStrokeStyle;
	var constantLineStrokeStyle = new SolidLine({
		thickness: 1,
		fillStyle: isDark ? whiteFillStyle : blackFillStyle,
	});
	var uiButtonFillStyle = isDark ? whiteFillStyle : blackFillStyle;
	var uiBackgroundFillStyle = new SolidFill({
		color: options.uiBackgroundColor,
	});
	var uiBackgroundStrokeStyle = new SolidLine({
		thickness: 1,
		fillStyle: new SolidFill({
			color: options.uiBorderColor,
		}),
	});
	var flatTheme = {
		isDark: isDark,
		effect: undefined,
		effectsText: false,
		effectsDashboardSplitters: false,
		lcjsBackgroundFillStyle: lcjsBackgroundFillStyle,
		lcjsBackgroundStrokeStyle: emptyLine,
		highlightColorOffset: highlightColorOffset,
		highlightColorOffsetAxisOverlay: highlightColorOffsetAxisOverlay,
		dashboardSplitterStyle: dashboardSplitterStyle,
		chartXYBackgroundFillStyle: chartBackgroundFillStyle,
		chartXYBackgroundStrokeStyle: emptyLine,
		chartXYTitleFont: fontChartTitles,
		chartXYTitleFillStyle: textFillStyle,
		chartXYSeriesBackgroundFillStyle: seriesBackgroundFillStyle,
		chartXYSeriesBackgroundStrokeStyle: emptyLine,
		chartXYZoomingRectangleFillStyle: zoomRectangleFillStyle,
		chartXYZoomingRectangleStrokeStyle: zoomRectangleStrokeStyle,
		chartXYFittingRectangleFillStyle: zoomRectangleFillStyle,
		chartXYFittingRectangleStrokeStyle: zoomRectangleStrokeStyle,
		lineSeriesStrokeStyle: seriesStrokeStylePalette,
		pointLineSeriesStrokeStyle: seriesStrokeStylePalette,
		pointLineSeriesFillStyle: seriesFillStylePalette,
		pointSeriesFillStyle: seriesFillStylePalette,
		ellipseSeriesFillStyle: seriesFillStylePalette,
		ellipseSeriesStrokeStyle: seriesStrokeStylePalette,
		polygonSeriesFillStyle: seriesFillStylePalette,
		polygonSeriesStrokeStyle: seriesStrokeStylePalette,
		rectangleSeriesFillStyle: seriesFillStylePalette,
		rectangleSeriesStrokeStyle: emptyLine,
		segmentSeriesStrokeStyle: seriesStrokeStylePalette,
		boxSeriesBodyFillStyle: seriesFillStylePalette(0),
		boxSeriesBodyStrokeStyle: emptyLine,
		boxSeriesStrokeStyle: new SolidLine({
			thickness: 1,
			fillStyle: isDark ? whiteFillStyle : blackFillStyle,
		}),
		boxSeriesMedianStrokeStyle: new SolidLine({
			thickness: 1,
			fillStyle: isDark ? blackFillStyle : whiteFillStyle,
		}),
		ohlcCandleBodyFillStylePositive: dataFillStylePositive,
		ohlcCandleBodyFillStyleNegative: dataFillStyleNegative,
		ohlcCandleBodyStrokeStylePositive: emptyLine,
		ohlcCandleBodyStrokeStyleNegative: emptyLine,
		ohlcCandleStrokeStyle: new SolidLine({
			thickness: 1,
			fillStyle: isDark ? whiteFillStyle : blackFillStyle,
		}),
		ohlcBarStrokeStylePositive: new SolidLine({
			thickness: 2,
			fillStyle: dataFillStylePositive,
		}),
		ohlcBarStrokeStyleNegative: new SolidLine({
			thickness: 2,
			fillStyle: dataFillStyleNegative,
		}),
		heatmapGridSeriesFillStyle: seriesFillStylePalette,
		heatmapGridSeriesWireframeStyle: wireframeStyle,
		heatmapScrollingGridSeriesFillStyle: seriesFillStylePalette,
		heatmapScrollingGridSeriesWireframeStyle: wireframeStyle,
		areaRangeSeriesFillStyle: areaSeriesFillStylePalette,
		areaRangeSeriesStrokeStyle: dataBorderStrokePalette,
		areaRangeSeriesFillStyleInverted: areaSeriesFillStylePalette,
		areaRangeSeriesStrokeStyleInverted: dataBorderStrokePalette,
		areaSeriesBipolarHighFillStyle: areaSeriesFillStylePalette,
		areaSeriesBipolarHighStrokeStyle: dataBorderStrokePalette,
		areaSeriesBipolarLowFillStyle: areaSeriesFillStylePalette,
		areaSeriesBipolarLowStrokeStyle: dataBorderStrokePalette,
		areaSeriesPositiveFillStyle: areaSeriesFillStylePalette,
		areaSeriesPositiveStrokeStyle: dataBorderStrokePalette,
		areaSeriesNegativeFillStyle: areaSeriesFillStylePalette,
		areaSeriesNegativeStrokeStyle: dataBorderStrokePalette,
		xAxisTitleFont: fontAxisTitles,
		xAxisTitleFillStyle: textFillStyle,
		xAxisStrokeStyle: axisStrokeStyle,
		xAxisNibStyle: emptyLine,
		xAxisOverlayStyle: axisOverlayStyle,
		xAxisZoomingBandFillStyle: zoomRectangleFillStyle,
		xAxisZoomingBandStrokeStyle: emptyLine,
		xAxisNumericTicks: numericTickStrategy,
		xAxisDateTimeTicks: dateTimeTickStrategy,
		xAxisTimeTicks: timeTickStrategy,
		yAxisTitleFont: fontAxisTitles,
		yAxisTitleFillStyle: textFillStyle,
		yAxisStrokeStyle: axisStrokeStyle,
		yAxisNibStyle: emptyLine,
		yAxisOverlayStyle: axisOverlayStyle,
		yAxisZoomingBandFillStyle: zoomRectangleFillStyle,
		yAxisZoomingBandStrokeStyle: emptyLine,
		yAxisNumericTicks: numericTickStrategy,
		yAxisDateTimeTicks: dateTimeTickStrategy,
		yAxisTimeTicks: timeTickStrategy,
		bandFillStyle: bandFillStyle,
		bandStrokeStyle: bandStrokeStyle,
		constantLineStrokeStyle: constantLineStrokeStyle,
		barChartBackgroundFillStyle: chartBackgroundFillStyle,
		barChartBackgroundStrokeStyle: emptyLine,
		barChartTitleFont: fontChartTitles,
		barChartTitleFillStyle: textFillStyle,
		barChartSeriesBackgroundFillStyle: seriesBackgroundFillStyle,
		barChartSeriesBackgroundStrokeStyle: emptyLine,
		barChartBarFillStyle: seriesFillStylePalette,
		barChartBarStrokeStyle: emptyLine,
		barChartValueAxisTitleFont: fontAxisTitles,
		barChartValueAxisTitleFillStyle: textFillStyle,
		barChartValueAxisStrokeStyle: axisStrokeStyle,
		barChartValueAxisTicks: numericTickStrategy
			.setMajorTickStyle(function (major) {
				return major.setGridStrokeStyle(emptyLine);
			})
			.setMinorTickStyle(function (minor) {
				return !isVisibleTicks(minor)
					? minor
					: minor.setGridStrokeStyle(emptyLine);
			}),
		barChartCategoryAxisTitleFont: fontAxisTitles,
		barChartCategoryAxisTitleFillStyle: textFillStyle,
		barChartCategoryAxisStrokeStyle: axisStrokeStyle,
		barChartCategoryLabels: {
			formatter: function (bar, category, value) {
				return category;
			},
			labelFillStyle: numericTickStrategy.majorTickStyle.labelFillStyle,
			labelFont: numericTickStrategy.majorTickStyle.labelFont,
			labelMargin: 8,
			tickStyle: numericTickStrategy.majorTickStyle.tickStyle,
			tickLength: 0,
			labelRotation: 0,
		},
		barChartValueLabelsAfterBars: {
			position: "after-bar",
			formatter: function (bar, category, value) {
				return bar.chart.valueAxis.formatValue(value);
			},
			labelFillStyle: numericTickStrategy.majorTickStyle.labelFillStyle,
			labelFont: numericTickStrategy.majorTickStyle.labelFont,
			labelMargin: 8,
			labelRotation: 0,
		},
		barChartValueLabelsInsideBars: {
			position: "inside-bar",
			formatter: function (bar, category, value) {
				return bar.chart.valueAxis.formatValue(value);
			},
			labelFillStyle: isDark ? whiteFillStyle : blackFillStyle,
			labelFont: numericTickStrategy.majorTickStyle.labelFont,
			labelMargin: 8,
			labelRotation: 0,
		},
		chart3DBackgroundFillStyle: chartBackgroundFillStyle,
		chart3DBackgroundStrokeStyle: emptyLine,
		chart3DTitleFont: fontChartTitles,
		chart3DTitleFillStyle: textFillStyle,
		chart3DSeriesBackgroundFillStyle: seriesBackgroundFillStyle,
		chart3DSeriesBackgroundStrokeStyle: emptyLine,
		chart3DBoundingBoxStrokeStyle: emptyLine,
		xAxis3DTitleFont: fontAxisTitles,
		xAxis3DTitleFillStyle: textFillStyle,
		xAxis3DStrokeStyle: axisStrokeStyle,
		xAxis3DNumericTicks: numericTickStrategy,
		xAxis3DDateTimeTicks: dateTimeTickStrategy,
		xAxis3DTimeTicks: timeTickStrategy,
		yAxis3DTitleFont: fontAxisTitles,
		yAxis3DTitleFillStyle: textFillStyle,
		yAxis3DStrokeStyle: axisStrokeStyle,
		yAxis3DNumericTicks: numericTickStrategy,
		yAxis3DDateTimeTicks: dateTimeTickStrategy,
		yAxis3DTimeTicks: timeTickStrategy,
		zAxis3DTitleFont: fontAxisTitles,
		zAxis3DTitleFillStyle: textFillStyle,
		zAxis3DStrokeStyle: axisStrokeStyle,
		zAxis3DNumericTicks: numericTickStrategy,
		zAxis3DDateTimeTicks: dateTimeTickStrategy,
		zAxis3DTimeTicks: timeTickStrategy,
		lineSeries3DStrokeStyle: seriesStrokeStylePalette,
		pointLineSeries3DStrokeStyle: seriesStrokeStylePalette,
		pointLineSeries3DPointStyle: pointSeries3DPointStylePalette,
		pointSeries3DPointStyle: pointSeries3DPointStylePalette,
		pointCloudSeries3DPointStyle: pointCloudSeries3DPointStylePalette,
		surfaceGridSeries3DFillStyle: seriesFillStylePalette,
		surfaceGridSeries3DWireframeStyle: wireframeStyle,
		surfaceScrollingGridSeries3DFillStyle: seriesFillStylePalette,
		surfaceScrollingGridSeries3DWireframeStyle: wireframeStyle,
		boxSeries3DFillStyle: seriesFillStylePalette,
		polarChartBackgroundFillStyle: chartBackgroundFillStyle,
		polarChartBackgroundStrokeStyle: emptyLine,
		polarChartTitleFont: fontChartTitles,
		polarChartTitleFillStyle: textFillStyle,
		polarChartSeriesBackgroundFillStyle: seriesBackgroundFillStyle,
		polarChartSeriesBackgroundStrokeStyle: emptyLine,
		polarSectorFillStyle: bandFillStyle,
		polarSectorStrokeStyle: bandStrokeStyle,
		polarAmplitudeAxisTitleFont: fontAxisTitles,
		polarAmplitudeAxisTitleFillStyle: textFillStyle,
		polarAmplitudeAxisStrokeStyle: axisStrokeStyle,
		polarAmplitudeAxisNumericTicks: numericTickStrategy,
		polarAmplitudeAxisDateTimeTicks: dateTimeTickStrategy,
		polarAmplitudeAxisTimeTicks: timeTickStrategy,
		polarRadialAxisTitleFont: fontAxisTitles,
		polarRadialAxisTitleFillStyle: textFillStyle,
		polarRadialAxisStrokeStyle: axisStrokeStyle,
		polarRadialAxisTickStyle: tickStyle,
		polarLineSeriesStrokeStyle: seriesStrokeStylePalette,
		polarPointLineSeriesFillStyle: seriesFillStylePalette,
		polarPointLineSeriesStrokeStyle: seriesStrokeStylePalette,
		polarPointSeriesFillStyle: seriesFillStylePalette,
		polarPolygonSeriesFillStyle: areaSeriesFillStylePalette,
		polarPolygonSeriesStrokeStyle: dataBorderStrokePalette,
		polarAreaSeriesFillStyle: areaSeriesFillStylePalette,
		polarAreaSeriesStrokeStyle: dataBorderStrokePalette,
		mapChartBackgroundFillStyle: chartBackgroundFillStyle,
		mapChartBackgroundStrokeStyle: emptyLine,
		mapChartTitleFont: fontChartTitles,
		mapChartTitleFillStyle: textFillStyle,
		mapChartFillStyle: primaryDataFillStyle,
		mapChartStrokeStyle: new SolidLine({
			thickness: 1,
			fillStyle: blackFillStyle,
		}),
		mapChartOutlierRegionFillStyle: emptyFill,
		mapChartOutlierRegionStrokeStyle: new SolidLine({
			thickness: 1,
			fillStyle: isDark ? whiteFillStyle : blackFillStyle,
		}),
		mapChartSeparateRegionFillStyle: uiBackgroundFillStyle,
		mapChartSeparateRegionStrokeStyle: uiBackgroundStrokeStyle,
		dataGridBackgroundFillStyle: chartBackgroundFillStyle,
		dataGridBackgroundStrokeStyle: emptyLine,
		dataGridTitleFont: fontChartTitles,
		dataGridTitleFillStyle: textFillStyle,
		dataGridTextFont: fontOther,
		dataGridTextFillStyle: textFillStyle,
		dataGridCellBackgroundFillStyle: seriesBackgroundFillStyle,
		dataGridBorderStrokeStyle: uiBackgroundStrokeStyle,
		dataGridScrollBarBackgroundFillStyle: new SolidFill({
			color: ColorRGBA(30, 30, 30),
		}),
		dataGridScrollBarBackgroundStrokeStyle: emptyLine,
		dataGridScrollBarFillStyle: new SolidFill({
			color: ColorRGBA(30, 30, 30),
		}),
		dataGridScrollBarStrokeStyle: uiBackgroundStrokeStyle,
		dataGridScrollBarButtonFillStyle: new SolidFill({
			color: ColorRGBA(30, 30, 30),
		}),
		dataGridScrollBarButtonStrokeStyle: uiBackgroundStrokeStyle,
		dataGridScrollBarButtonArrowFillStyle: uiButtonFillStyle,
		dataGridScrollBarButtonArrowStrokeStyle: emptyLine,
		sparkLineChartStrokeStyle: seriesStrokeStylePalette(0),
		sparkPointChartFillStyle: seriesFillStylePalette(0),
		sparkBarChartFillStyle: seriesFillStylePalette(0),
		sparkBarChartStrokeStyle: dataBorderStrokePalette(0),
		sparkAreaChartFillStyle: areaSeriesFillStylePalette(0),
		sparkAreaChartStrokeStyle: dataBorderStrokePalette(0),
		sparkPieChartFillStyle: seriesFillStylePalette,
		sparkPieChartStrokeStyle: uiBackgroundStrokeStyle,
		sparkChartBandFillStyle: bandFillStyle,
		sparkChartBandStrokeStyle: bandStrokeStyle,
		sparkChartConstantLineStrokeStyle: constantLineStrokeStyle,
		spiderChartBackgroundFillStyle: chartBackgroundFillStyle,
		spiderChartBackgroundStrokeStyle: emptyLine,
		spiderChartTitleFont: fontChartTitles,
		spiderChartTitleFillStyle: textFillStyle,
		spiderChartSeriesBackgroundFillStyle: seriesBackgroundFillStyle,
		spiderChartSeriesBackgroundStrokeStyle: emptyLine,
		spiderChartWebStyle: tickStyle.gridStrokeStyle,
		spiderChartScaleLabelFillStyle: textFillStyle,
		spiderChartScaleLabelFont: fontOther,
		spiderChartAxisLabelFillStyle: textFillStyle,
		spiderChartAxisLabelFont: fontAxisTitles,
		spiderChartAxisStrokeStyle: axisStrokeStyle,
		spiderChartAxisNibStrokeStyle: emptyLine,
		spiderSeriesFillStyle: areaSeriesFillStylePalette,
		spiderSeriesStrokeStyle: dataBorderStrokePalette,
		spiderSeriesPointFillStyle: seriesFillStylePalette,
		pieChartBackgroundFillStyle: chartBackgroundFillStyle,
		pieChartBackgroundStrokeStyle: emptyLine,
		pieChartTitleFont: fontAxisTitles,
		pieChartTitleFillStyle: textFillStyle,
		pieChartSliceFillStylePalette: seriesFillStylePalette,
		pieChartSliceStrokeStyle: uiBackgroundStrokeStyle,
		pieChartSliceLabelFont: fontOther,
		pieChartSliceLabelFillStyle: textFillStyle,
		pieChartConnectorStrokeStyle: uiBackgroundStrokeStyle,
		funnelChartBackgroundFillStyle: chartBackgroundFillStyle,
		funnelChartBackgroundStrokeStyle: emptyLine,
		funnelChartTitleFont: fontChartTitles,
		funnelChartTitleFillStyle: textFillStyle,
		funnelChartSliceFillStylePalette: seriesFillStylePalette,
		funnelChartSliceStrokeStyle: uiBackgroundStrokeStyle,
		funnelChartSliceLabelFont: fontOther,
		funnelChartSliceLabelFillStyle: textFillStyle,
		funnelChartConnectorStrokeStyle: uiBackgroundStrokeStyle,
		pyramidChartBackgroundFillStyle: chartBackgroundFillStyle,
		pyramidChartBackgroundStrokeStyle: emptyLine,
		pyramidChartTitleFont: fontChartTitles,
		pyramidChartTitleFillStyle: textFillStyle,
		pyramidChartSliceFillStylePalette: seriesFillStylePalette,
		pyramidChartSliceStrokeStyle: uiBackgroundStrokeStyle,
		pyramidChartSliceLabelFont: fontOther,
		pyramidChartSliceLabelFillStyle: textFillStyle,
		pyramidChartConnectorStrokeStyle: uiBackgroundStrokeStyle,
		gaugeChartBackgroundFillStyle: chartBackgroundFillStyle,
		gaugeChartBackgroundStrokeStyle: emptyLine,
		gaugeChartTitleFont: fontChartTitles,
		gaugeChartTitleFillStyle: textFillStyle,
		gaugeChartEmptyGaugeFillStyle: isDark ? blackFillStyle : whiteFillStyle,
		gaugeChartEmptyGaugeStrokeStyle: uiBackgroundStrokeStyle,
		gaugeChartGaugeFillStyle: primaryDataFillStyle,
		gaugeChartIntervalLabelsFillStyle: textFillStyle,
		gaugeChartIntervalLabelsFont: fontOther,
		gaugeChartValueLabelFillStyle: textFillStyle,
		gaugeChartValueLabelFont: fontOther,
		uiPanelBackgroundFillStyle: chartBackgroundFillStyle,
		uiPanelBackgroundStrokeStyle: emptyLine,
		onScreenMenuBackgroundColor: ColorRGBA(254, 204, 0, 0.7),
		uiButtonFillStyle: uiButtonFillStyle,
		uiButtonStrokeStyle: uiBackgroundStrokeStyle,
		uiButtonSize: 10,
		uiBackgroundFillStyle: uiBackgroundFillStyle,
		uiBackgroundStrokeStyle: uiBackgroundStrokeStyle,
		uiTextFillStyle: textFillStyle,
		uiTextFont: fontOther,
		legendTitleFillStyle: textFillStyle,
		legendTitleFont: fontLegendTitle,
		cursorTickMarkerXBackgroundFillStyle: uiBackgroundFillStyle,
		cursorTickMarkerXBackgroundStrokeStyle: uiBackgroundStrokeStyle,
		cursorTickMarkerXTextFillStyle: textFillStyle,
		cursorTickMarkerXTextFont: fontOther,
		cursorTickMarkerYBackgroundFillStyle: uiBackgroundFillStyle,
		cursorTickMarkerYBackgroundStrokeStyle: uiBackgroundStrokeStyle,
		cursorTickMarkerYTextFillStyle: textFillStyle,
		cursorTickMarkerYTextFont: fontOther,
		cursorPointMarkerFillStyle: emptyFill,
		cursorPointMarkerStrokeStyle: emptyLine,
		cursorResultTableFillStyle: uiBackgroundFillStyle,
		cursorResultTableStrokeStyle: uiBackgroundStrokeStyle,
		cursorResultTableTextFillStyle: textFillStyle,
		cursorResultTableTextFont: fontOther,
		cursorGridStrokeStyleX: cursorGridStrokeStyle,
		cursorGridStrokeStyleY: cursorGridStrokeStyle,
		chartMarkerPointMarkerFillStyle: isDark ? whiteFillStyle : blackFillStyle,
		chartMarkerPointMarkerStrokeStyle: emptyLine,
	};
	return flatTheme;
};

export { makeFlatTheme };
