import { TransferToFormData } from "@/src/utils/helper/TransferToFormData";
import { ApiPath } from "../../ApiPath";
import { BaseApiResponseModel } from "../../baseApiResponseModel/baseApiResponseModel";
import client from "../../client";
import { PostResponseModel } from "./models/PostResponseModel";
import { CreatePostRequestModel } from "./models/CreatePostRequestModel";
import { GetUsersPostsRequestModel } from "./models/GetUsersPostsModel";
import { UpdatePostRequestModel } from "./models/UpdatePostRequestModel";
import { LikeUsersModel, LikeUsersResponseModel } from "./models/LikeUsersModel";

interface IPostRepo {
	createPost: (data: CreatePostRequestModel) => Promise<BaseApiResponseModel<PostResponseModel>>;
	getPosts: (data: GetUsersPostsRequestModel) => Promise<BaseApiResponseModel<PostResponseModel[]>>;
	getPostById: (id: string) => Promise<BaseApiResponseModel<PostResponseModel>>;
	updatePost: (data: UpdatePostRequestModel) => Promise<BaseApiResponseModel<PostResponseModel>>;
	deletePost: (id: string) => Promise<BaseApiResponseModel<any>>;
	likePost: (id: string) => Promise<BaseApiResponseModel<any>>;
	sharePost: (id: string) => Promise<BaseApiResponseModel<any>>;
	getPostLikes: (params: LikeUsersResponseModel) => Promise<BaseApiResponseModel<LikeUsersModel[]>>;
}
export class PostRepo implements IPostRepo {
	async createPost(data: CreatePostRequestModel): Promise<BaseApiResponseModel<PostResponseModel>> {
		const tranferedData = TransferToFormData(data);
		return client.post(ApiPath.CREATE_POST, tranferedData, { headers: { "Content-Type": "multipart/form-data" } });
	}

	async getPosts(data: GetUsersPostsRequestModel): Promise<BaseApiResponseModel<PostResponseModel[]>> {
		return client.get(ApiPath.GET_POSTS, data);
	}

	async getPostById(id: string): Promise<BaseApiResponseModel<PostResponseModel>> {
		return client.get(ApiPath.GET_POSTS + id);
	}

	async updatePost(data: UpdatePostRequestModel): Promise<BaseApiResponseModel<PostResponseModel>> {
		const tranferedData = TransferToFormData(data);
		return client.patch(ApiPath.UPDATE_POST + data.postId, tranferedData, { headers: { "Content-Type": "multipart/form-data" } });
	}

	async deletePost(id: string): Promise<BaseApiResponseModel<any>> {
		return client.delete(ApiPath.DELETE_POST + id);
	}

	async likePost(id: string): Promise<BaseApiResponseModel<any>> {
		return client.post(ApiPath.LIKE_POST + id, { post_id: id });
	}

	async sharePost(id: string): Promise<BaseApiResponseModel<any>> {
		return client.post(ApiPath.SHARE_POST + id, { post_id: id });
	}

	async getPostLikes(params: LikeUsersResponseModel): Promise<BaseApiResponseModel<LikeUsersModel[]>> {
		return client.get(ApiPath.GET_USER_LIKES + params.postId, params);
	}
}
export const defaultPostRepo = new PostRepo();