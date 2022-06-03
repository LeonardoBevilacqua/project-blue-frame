export type FileResult = { result: string; name: string };

/**
 * Method responsible to read file
 * @param file file to be read
 * @returns result and name file
 */
export function readFile(file: File): Promise<FileResult> {
	return new Promise((resolve) => {
		const reader = new FileReader();

		reader.onload = () => resolve({ result: reader.result?.toString() ?? '', name: file.name });

		reader.readAsDataURL(file);
	});
}

/**
 * Method responsible to make a post request
 * @param url url of the request
 * @param data data to be sent
 * @returns promise of the request
 */
export function post<T>(url: string, data: T) {
	return fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify(data)
	});
}
