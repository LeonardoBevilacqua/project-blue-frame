import type { RequestEvent } from '@sveltejs/kit/types/private';
import { readFileSync } from 'fs';

export async function get({ params }: RequestEvent) {
	const { album, image } = params;

	const imageBuffer = readFileSync(`static/images/${album}/${image}`);

	return { 'Content-Type': 'image/png', 'Content-Length': imageBuffer.length, body: imageBuffer };
}
