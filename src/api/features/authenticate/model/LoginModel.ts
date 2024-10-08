export interface LoginRequestModel {
  email?: string
  password?: string
}

export interface LoginResponseModel {
  accesstoken?: string
  user?: {
    id?: string
    name?: string
    avatar?: string
  }
}