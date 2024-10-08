import { ApiPath } from "../../ApiPath";
import { BaseApiResponseModel } from "../../baseApiResponseModel/baseApiResponseModel";
import client from "../../client";
import { LoginRequestModel, LoginResponseModel } from "./model/LoginModel";
import { RegisterRequestModel, RegisterResponseModel } from "./model/RegisterModel";

interface IAuthenRepo {
  login(data: LoginRequestModel): Promise<BaseApiResponseModel<LoginResponseModel>>;
  register(data: RegisterRequestModel): Promise<BaseApiResponseModel<RegisterResponseModel>>;
}

export class AuthenRepo implements IAuthenRepo {
  async login(data: LoginRequestModel): Promise<BaseApiResponseModel<LoginResponseModel>> {
    return client.post(ApiPath.LOGIN, data);
  }

  async register(data: RegisterRequestModel): Promise<BaseApiResponseModel<RegisterResponseModel>> {
    return client.post(ApiPath.REGISTER, data);
  }
}

export const defaultAuthenRepo = new AuthenRepo();