const baseUrl = process.env.serverUrl || 'http://localhost:5000' 
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}
class ApplicationService {
    get = <T>(path: string): Promise<T> => fetch(`${baseUrl}/${path}`, {
        method: 'GET',
        headers
    }).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    })

    post = <T>(path: string, data: T): Promise<T> => fetch(`${baseUrl}/${path}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
    }).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    })

    put = <T>(path: string, data: T): Promise<T> => fetch(`${baseUrl}/${path}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data)
    }).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    })

    delete = <T>(path: string): Promise<T> => fetch(`${baseUrl}/${path}`, {
        method: 'DELETE',
        headers
    }).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    })

    postFile = <T>(path: string, field: string, file: File): Promise<T> => {
        const formData = new FormData()
        formData.append(field, file)

        let headers = {
            'Accept': 'application/json'
        }

        return fetch(`${baseUrl}/${path}`, {
            method: 'POST',
            headers,
            body: formData
        }).then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
    }
}

export default new ApplicationService()