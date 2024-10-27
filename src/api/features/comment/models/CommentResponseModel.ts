import { Privacy } from "@/src/api/baseApiResponseModel/baseApiResponseModel";

export interface CommentsResponseModel {
    id: string;
    postId: string;
    userId: string;
    parent_id?: string;
    content: string;
    likeCount: number;
    repCommentCount: number;
    created_at: string;
    user: {
        id: string;
    };
    privacy?: Privacy; 
    replies?: CommentsResponseModel[];
}