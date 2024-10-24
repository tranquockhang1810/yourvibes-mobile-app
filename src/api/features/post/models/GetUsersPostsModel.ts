export interface GetUsersPostsRequestModel {
  user_id?: string 
  content?: string
  location?: string
  is_advertisement?: boolean
  created_at?: string
  sort_by?: keyof GetUsersPostsRequestModel
  isDescending?: boolean
  limit?: number
  page?: number
}