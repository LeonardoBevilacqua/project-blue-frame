import ApplicationService from "./application.service";

export class AppService {
    getImages() {
        return ApplicationService.get<any>( "albums")
    }

    postAlbum(data: any) {
        return ApplicationService.post<any>("albums", data)
    }

    postAlbumImage(id: string, image: File) {
        return ApplicationService.postFile<any>(`albums/image/${id}`, "image", image)
    }
}

