import type { RequestEvent } from '@sveltejs/kit/types/private';
import { writeFileSync, existsSync, mkdirSync } from 'fs';

export async function post({ request, params }: RequestEvent) {
	if (!request.body) {
		return { body: { success: false } };
	}
	const data = await request.json();

	const file = data['image'];

	if (!existsSync(`static/images/${params['album']}`)) {
		mkdirSync(`static/images/${params['album']}`);
	}
	writeFileSync(`static/images/${params['album']}/${data['name']}`, file, 'base64');


	return { body: { success: true } };
}
