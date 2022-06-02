import { readdirSync } from 'fs';

export async function get() {
	const albums = readdirSync('static', { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);

	return { body: { success: true, content: albums } };
}
