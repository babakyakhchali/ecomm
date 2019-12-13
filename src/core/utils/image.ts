const sizeOf = require('image-size');
export function getImageDimensions(path: string) {
	return sizeOf(path) as { type: string, width: number, height: number };
}