import type { RequestEvent } from '@sveltejs/kit/types/private';
import { existsSync, readdirSync } from 'fs';

export async function get({ params }: RequestEvent) {
	const { album } = params;
    const images: { id: number; src: string; title: string; active: boolean }[] = []

	if (!existsSync(`static/${album}`)) {
		return { body: { success: false } };
	}

    readdirSync(`static/${album}`).forEach((file, index) => {
        images.push({
            id: index,
            src: file,
            title: file,
            active: false
        })
    })

	return { body: { success: true, content: images } };
}
