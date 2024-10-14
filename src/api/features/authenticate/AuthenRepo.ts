import { ApiPath } from "../../ApiPath";
import { BaseApiResponseModel } from "../../baseApiResponseModel/baseApiResponseModel";
import client from "../../client";
import { LoginRequestModel, LoginResponseModel } from "./model/LoginModel";
import { RegisterRequestModel, RegisterResponseModel } from "./model/RegisterModel";
import { VerifyOTPRequestModel, VerifyOTPResponseModel } from "./model/VerifyOTPModel";
import { ProfileRequestModel, ProfileResponseModel } from "./model/ProfileModel";

interface IAuthenRepo {
  login(data: LoginRequestModel): Promise<BaseApiResponseModel<LoginResponseModel>>;
  register(data: RegisterRequestModel): Promise<BaseApiResponseModel<RegisterResponseModel>>;
  verifyOTP(data: VerifyOTPRequestModel): Promise<BaseApiResponseModel<any>>;
  // profile(data: ProfileRequestModel): Promise<BaseApiResponseModel<ProfileResponseModel>>;
}

export class AuthenRepo implements IAuthenRepo {
  async login(data: LoginRequestModel): Promise<BaseApiResponseModel<LoginResponseModel>> {
    return client.post(ApiPath.LOGIN, data);
  }

  async register(data: RegisterRequestModel): Promise<BaseApiResponseModel<RegisterResponseModel>> {
    return client.post(ApiPath.REGISTER, data);
  }

  async verifyOTP(data: VerifyOTPRequestModel): Promise<BaseApiResponseModel<any>> {
    return client.post(ApiPath.VERIFIED_EMAIL, data);
  }

  // async profile(data: ProfileRequestModel): Promise<BaseApiResponseModel<ProfileResponseModel>> {
  //   return client.post(ApiPath.PROFILE, data);
  // }
}

export const defaultAuthenRepo = new AuthenRepo();