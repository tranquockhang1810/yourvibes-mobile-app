import { ApiPath } from "../../ApiPath";
import { BaseApiResponseModel } from "../../baseApiResponseModel/baseApiResponseModel";
import client from "../../client";
import { LoginRequestModel, LoginResponseModel } from "./model/LoginModel";
import { RegisterRequestModel, RegisterResponseModel } from "./model/RegisterModel";
import { VerifyOTPRequestModel, VerifyOTPResponseModel } from "./model/VerifyOTPModel";

interface IAuthenRepo {
  login(data: LoginRequestModel): Promise<BaseApiResponseModel<LoginResponseModel>>;
  register(data: RegisterRequestModel): Promise<BaseApiResponseModel<RegisterResponseModel>>;
  verifyOTP(data: VerifyOTPRequestModel): Promise<BaseApiResponseModel<any>>;
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
}

export const defaultAuthenRepo = new AuthenRepo();