import { writable } from "svelte/store";

export const settings = writable(
	JSON.parse(localStorage.getItem("settings")) || { baudRate: 115200 }
);
settings.subscribe((value) =>
	localStorage.setItem("settings", JSON.stringify(value))
);
