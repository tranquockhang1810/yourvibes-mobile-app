import { Privacy } from "@/src/api/baseApiResponseModel/baseApiResponseModel";

export interface CreateCommentsRequestModel {
    content: string; 
    parent_id?: string; 
    post_id: string; 
}

