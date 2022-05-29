import type { RequestEvent } from '@sveltejs/kit/types/private';
import { existsSync, readdirSync } from 'fs';

export async function get({ params }: RequestEvent) {
	const { album } = params;
    const images: string[] = []

	if (!existsSync(`static/${album}`)) {
		return { body: { success: false } };
	}

    readdirSync(`static/${album}`).forEach(file => {
        images.push(file)
    })

	return { body: { success: true, content: { album, images } } };
}
