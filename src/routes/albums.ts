import { readdirSync, existsSync, mkdirSync } from 'fs';

export async function get() {
	if (!existsSync('static/images/')) {
		mkdirSync('static/images/');
	}

	const albums = readdirSync('static/images', { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);

	return { body: { success: true, content: albums } };
}
