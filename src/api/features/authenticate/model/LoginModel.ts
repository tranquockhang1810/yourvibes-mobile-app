import { Privacy } from "@/src/api/baseApiResponseModel/baseApiResponseModel"

export interface LoginRequestModel {
  email?: string
  password?: string
}

export interface LoginResponseModel {
  accesstoken?: string
  user?: UserModel
}

export interface UserModel {
  id?: string,
  family_name?: string,
  name?: string,
  email?: string,
  phone_number?: string,
  birthday?: string,
  avatar_url?: string,
  capwall_url?: string,
  validator?: Privacy,
  auth_type?: string,
  auth_google_id?: string,
  post_count?: number,
  status?: boolean,
  created_at?: string,
  updated_at?: string
}