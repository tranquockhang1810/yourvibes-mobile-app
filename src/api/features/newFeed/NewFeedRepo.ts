import { ApiPath } from "../../ApiPath";
import { BaseApiResponseModel } from "../../baseApiResponseModel/baseApiResponseModel";
import client from "../../client";
import { NewFeedRequestModel, NewFeedResponseModel } from "./Model/NewFeedModel";

interface INewFeedRepo {
    getNewFeed: (data: NewFeedRequestModel) => Promise<BaseApiResponseModel<NewFeedResponseModel[]>>;
}
export class NewFeedRepo implements INewFeedRepo {
    async getNewFeed(data: NewFeedRequestModel):
        Promise<BaseApiResponseModel<NewFeedResponseModel[]>> {
          return client.get(ApiPath.GET_NEW_FEEDS, data);
    }
}
export const defaultNewFeedRepo = new NewFeedRepo();