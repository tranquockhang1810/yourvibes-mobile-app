 import { ApiPath } from "../../ApiPath";
import { BaseApiResponseModel } from "../../baseApiResponseModel/baseApiResponseModel";
import client from "../../client";
import { CommentsResponseModel } from "./models/CommentResponseModel";
import { CreateCommentsRequestModel } from "./models/CreateCommentsModel";
import { GetCommentsRequestModel } from "./models/GetCommentsModel";

interface ICommentRepo {
    createComment: (data: CreateCommentsRequestModel) => Promise<BaseApiResponseModel<CommentsResponseModel>>;
    getComments: (data: GetCommentsRequestModel) => Promise<BaseApiResponseModel<CommentsResponseModel[]>>;
}

export class CommentRepo implements ICommentRepo {
    async createComment(data: CreateCommentsRequestModel): Promise<BaseApiResponseModel<CommentsResponseModel>> { 
        return client.post(ApiPath.CREATE_COMMENT, data, { headers: { "Content-Type": "json" } });
    }

    async getComments(data: GetCommentsRequestModel): Promise<BaseApiResponseModel<CommentsResponseModel[]>> {
        const queryParams = new URLSearchParams({
            post_id: data.PostId,
            // parent_id: data.parent_id || '', 
            page: data.page.toString(),
            limit: data.limit.toString(),
        }).toString();

        return client.get(`${ApiPath.GET_COMMENTS}?${queryParams}`); 
    }
}

export const defaultCommentRepo = new CommentRepo();
