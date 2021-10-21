import { AxiosResponse } from "axios";
import { ApplicationService } from "./application.service";

const applicationService = new ApplicationService();

export class AppService {
    getImages(): Promise<AxiosResponse<any>> {
        return applicationService.get( "/albums")
    }
}

