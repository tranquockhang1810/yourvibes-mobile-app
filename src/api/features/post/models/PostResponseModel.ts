export interface PostResponseModel {
  id?: string
  user?: {
    id?: string,
    name?: string,
    avatar?: string
  },
  parentPost?: PostResponseModel
  mediaUrl?: PostMediaModel[],
  title?: string,
  content: string,
  createdAt?: string,
  likeCount?: number,
  commentCount?: number,
  privacy?: string,
  status?: boolean
}

export interface PostMediaModel {
  postID?: string,
  mediaUrl?: string,
  description?: string,
  createdAt?: string
  status?: boolean
}