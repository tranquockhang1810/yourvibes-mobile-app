import { ApiPath } from "../../ApiPath";
import { BaseApiResponseModel } from "../../baseApiResponseModel/baseApiResponseModel";
import client from "../../client";
import { LoginRequestModel, LoginResponseModel } from "./model/LoginModel";
import { RegisterRequestModel } from "./model/RegisterModel";
import { VerifyOTPRequestModel } from "./model/VerifyOTPModel";
import { ProfileRequestModel, ProfileResponseModel } from "./model/ProfileModel";
import { PostResponseModel } from "../post/models/PostResponseModel";

interface IAuthenRepo {
  login(data: LoginRequestModel): Promise<BaseApiResponseModel<LoginResponseModel>>;
  register(data: RegisterRequestModel): Promise<BaseApiResponseModel<any>>;
  verifyOTP(data: VerifyOTPRequestModel): Promise<BaseApiResponseModel<any>>;
  profile(data: ProfileRequestModel): Promise<BaseApiResponseModel<ProfileResponseModel>>; 
  getUserPost(data: { userId: string }): Promise<BaseApiResponseModel<PostResponseModel[]>>;
}

export class AuthenRepo implements IAuthenRepo {
  async login(data: LoginRequestModel): Promise<BaseApiResponseModel<LoginResponseModel>> {
    return client.post(ApiPath.LOGIN, data);
  }

  async register(data: RegisterRequestModel): Promise<BaseApiResponseModel<any>> {
    return client.post(ApiPath.REGISTER, data);
  }

  async verifyOTP(data: VerifyOTPRequestModel): Promise<BaseApiResponseModel<any>> {
    return client.post(ApiPath.VERIFIED_EMAIL, data);
  }
  async profile(data: ProfileRequestModel): Promise<BaseApiResponseModel<ProfileResponseModel>> {
    const { id } = data;
    return client.get(`${ApiPath.PROFILE}${id}`);
  }
  async getUserPost(data: { userId: string }): Promise<BaseApiResponseModel<PostResponseModel[]>> {
    return client.get(ApiPath.GET_POSTS + data.userId, data);
  }
}

export const defaultAuthenRepo = new AuthenRepo();