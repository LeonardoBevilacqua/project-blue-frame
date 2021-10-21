import axios, { AxiosInstance } from "axios";

export class ApplicationService {
    api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:5000'
        })
    }

    get(url: string): Promise<any> {
        return this.api.get<any>(url)
    }
}