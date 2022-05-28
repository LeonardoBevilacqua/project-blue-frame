import type { RequestEvent } from '@sveltejs/kit/types/private';
import { writeFileSync, existsSync, mkdirSync } from 'fs';

export async function post({ request, params }: RequestEvent) {
	if (!request.body) {
		return { body: { success: false } };
	}
	const data = await request.json();

	const file = data['image'];

	if (!existsSync(`static/${params['album']}`)) {
		mkdirSync(`static/${params['album']}`);
	}
	writeFileSync(`static/${params['album']}/${data['name']}`, file, 'base64');


	return { body: { success: true } };
}
