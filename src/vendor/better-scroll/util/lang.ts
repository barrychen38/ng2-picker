export function extend(target, source) {
	for (let key in source) {
		if (source.hasOwnProperty(key)) {
			target[key] = source[key];
		}
	}
};

const DEFAULT_INTERVAL = 100 / 60;

export const requestAnimationFrame = (() => {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		// if all else fails, use setTimeout
		function (callback: any) {
			return window.setTimeout(callback, (callback.interval || DEFAULT_INTERVAL) / 2); // make interval as precise as possible.
		};
})();

export const cancelAnimationFrame = (() => {
	return window.cancelAnimationFrame ||
		window.webkitCancelAnimationFrame ||
		function (id) {
			window.clearTimeout(id);
		};
})();