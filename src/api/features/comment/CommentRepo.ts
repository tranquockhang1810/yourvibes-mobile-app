import { ApiPath } from "../../ApiPath"; 
import { BaseApiResponseModel } from "../../baseApiResponseModel/baseApiResponseModel";
import client from "../../client";
import { CommentsResponseModel } from "./models/CommentResponseModel";
import { CreateCommentsRequestModel } from "./models/CreateCommentsModel";
import { GetCommentsRequestModel } from "./models/GetCommentsModel";

interface ICommentRepo {
    createComment: (data: CreateCommentsRequestModel) => Promise<BaseApiResponseModel<CommentsResponseModel>>;
    createReply: (data: CreateCommentsRequestModel) => Promise<BaseApiResponseModel<CommentsResponseModel>>;  
    getComments: (data: GetCommentsRequestModel) => Promise<BaseApiResponseModel<CommentsResponseModel[]>>;
    deleteComment: (id: string) => Promise<BaseApiResponseModel<any>>;
    updateComment: (data: CreateCommentsRequestModel) => Promise<BaseApiResponseModel<CommentsResponseModel>>;
    getReplies: (parentId: string) => Promise<BaseApiResponseModel<CommentsResponseModel[]>>;
}

export class CommentRepo implements ICommentRepo {
    async createComment(data: CreateCommentsRequestModel): Promise<BaseApiResponseModel<CommentsResponseModel>> { 
        return await client.post(ApiPath.CREATE_COMMENT, data, { headers: { "Content-Type": "application/json" } }); 
    }

    async createReply(data: CreateCommentsRequestModel): Promise<BaseApiResponseModel<CommentsResponseModel>> {   
        return await client.post(ApiPath.CREATE_COMMENT, data, { headers: { "Content-Type": "application/json" } }); 
    }

    async getComments(data: GetCommentsRequestModel): Promise<BaseApiResponseModel<CommentsResponseModel[]>> {
        const queryParams = new URLSearchParams({
            post_id: data.PostId,
            page: data.page.toString(),
            limit: data.limit.toString(),
        }).toString();

        return client.get(`${ApiPath.GET_COMMENTS}?${queryParams}`); 
    }

    async deleteComment(id: string): Promise<BaseApiResponseModel<any>> {
        return client.delete(ApiPath.DELETE_COMMENT + id);
    }

    async updateComment(data: { content: string }): Promise<BaseApiResponseModel<CommentsResponseModel>> {
        return client.patch(ApiPath.UPDATE_COMMENT, data, { headers: { "Content-Type": "application/json" } });
    }

    async getReplies(parentId: string): Promise<BaseApiResponseModel<CommentsResponseModel[]>> {
        const queryParams = new URLSearchParams({
            parent_id: parentId,
        }).toString();

        return client.get(`${ApiPath.GET_COMMENTS}?${queryParams}`); 
    }
}

export const defaultCommentRepo = new CommentRepo();
