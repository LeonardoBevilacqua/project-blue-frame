import axios, { AxiosInstance } from "axios";

export class ApplicationService {
    api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: 'http://0.0.0.0:5000' // TODO Add env
        })
    }

    get(url: string): Promise<any> {
        return this.api.get<any>(url)
    }

    post(url: string, data: any): Promise<any> {
        return this.api.post<any>(url, data)
    }

    postFile(url: string, field: string, file: File): Promise<any> {
        const formData = new FormData()
        formData.append(field, file)
        return this.api.post<any>(url, formData, {
            headers: {
                "Content-Type": `multipart/form-data; boundary=&`
            }
        })
    }
}