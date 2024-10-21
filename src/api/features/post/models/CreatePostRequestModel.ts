import { Privacy } from "@/src/api/baseApiResponseModel/baseApiResponseModel"

export interface CreatePostRequestModel {
    title?: string
    content?: string
    privacy?: Privacy
    location?: string
    media?: {
        uri?: string,
        name?: string,
        type?: string
    }[]
}