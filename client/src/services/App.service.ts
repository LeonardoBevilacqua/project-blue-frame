import { AxiosResponse } from "axios";
import { ApplicationService } from "./application.service";

const applicationService = new ApplicationService();

export class AppService {
    getImages(): Promise<AxiosResponse<any>> {
        return applicationService.get( "/albums")
    }

    postAlbum(data: any): Promise<AxiosResponse<any>> {
        return applicationService.post("/albums", data)
    }

    postAlbumImage(id: string, image: File): Promise<AxiosResponse<any>> {
        return applicationService.postFile(`/albums/image/${id}`, "image", image)
    }
}

