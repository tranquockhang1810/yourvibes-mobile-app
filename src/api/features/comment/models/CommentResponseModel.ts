import { Privacy } from "@/src/api/baseApiResponseModel/baseApiResponseModel";

export interface CommentsResponseModel {
    id: string;
    postId: string;
    userId: string;
    parentId?: string;
    content: string;
    likeCount: number;
    repCommentCount: number;
    createdAt: string;
    updatedAt: string;
    user: {
        id: string;
    };
    privacy?: Privacy;
    replies: any[];
}
