import type { RequestEvent } from '@sveltejs/kit/types/private';
import { writeFileSync } from 'fs';

export async function post({request} : RequestEvent) {
    if (!request.body) {
        return { body: { success: false } };
    }
    const data = await request.json()

	const file = data['image'];

	writeFileSync(`static/avatar2.png`, file, 'base64');

	 return { body: { success: true } };
}
