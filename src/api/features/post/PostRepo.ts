import { TransferToFormData } from "@/src/utils/helper/TransferToFormData";
import { ApiPath } from "../../ApiPath";
import { BaseApiResponseModel } from "../../baseApiResponseModel/baseApiResponseModel";
import client from "../../client";
import { PostResponseModel } from "./models/PostResponseModel";
import { CreatePostRequestModel } from "./models/CreatePostRequestModel";
import { GetUsersPostsRequestModel } from "./models/GetUsersPostsModel";

interface IPostRepo {
	createPost: (data: CreatePostRequestModel) => Promise<BaseApiResponseModel<PostResponseModel>>;
	getPosts: (data: GetUsersPostsRequestModel) => Promise<BaseApiResponseModel<PostResponseModel[]>>;
}
export class PostRepo implements IPostRepo {
	async createPost(data: CreatePostRequestModel): Promise<BaseApiResponseModel<PostResponseModel>> {
		const tranferedData = TransferToFormData(data);
		console.log("form data", tranferedData);
		return client.post(ApiPath.CREATE_POST, tranferedData, { headers: { "Content-Type": "multipart/form-data" } });
	}

	async getPosts(data: GetUsersPostsRequestModel): Promise<BaseApiResponseModel<PostResponseModel[]>> {
		return client.get(ApiPath.GET_POSTS + data.user_id, data);
	}
}
export const defaultPostRepo = new PostRepo();