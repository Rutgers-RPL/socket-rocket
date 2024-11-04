import { makeFlatTheme } from "./makeChartTheme";
import { ColorHEX, FontSettings } from "@arction/lcjs";
// Created with LCJS Theme Editor https://github.com/Arction/lcjs-themes
export const basicTheme = makeFlatTheme({
	isDark: true,
	fontFamily: "Roboto Mono, monospace",
	fontWeight: "bold",
	backgroundColor: ColorHEX("#18181800"),
	textColor: ColorHEX("#ffffc8ff"),
	dataColors: [
		ColorHEX("#ffff5b"),
		ColorHEX("#ffcd5b"),
		ColorHEX("#ff9b5b"),
		ColorHEX("#ffc4bc"),
		ColorHEX("#ff94b8"),
		ColorHEX("#db94c6"),
		ColorHEX("#ebc4e0"),
		ColorHEX("#a994c6"),
		ColorHEX("#94e2c6"),
		ColorHEX("#94ffb0"),
		ColorHEX("#b4ffa5"),
	],
	axisColor: ColorHEX("#00000000"),
	gridLineColor: ColorHEX("#303030ff"),
	uiBackgroundColor: ColorHEX("#161616ff"),
	uiBorderColor: ColorHEX("#ffffff"),
	dashboardSplitterColor: ColorHEX("#2d2d2dff"),
});
