import usbIds from "./usb.ids.json";

export default function getUsbId(vid, pid) {
	const vidHex = vid.toString(16).padStart(4, "0");
	const pidHex = pid.toString(16).padStart(4, "0");
	const vendor = usbIds[vidHex];
	const product = vendor && vendor.products[pidHex];
	return {
		vendor: vendor ? vendor.name : "Unknown",
		product: product || "Unknown",
	};
}
