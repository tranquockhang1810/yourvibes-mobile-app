import { ApiPath } from "../../ApiPath";
import { BaseApiResponseModel } from "../../baseApiResponseModel/baseApiResponseModel";
import client from "../../client";
import { LoginRequestModel, LoginResponseModel } from "./model/LoginModel";


interface IAuthenRepo {
  login(data: LoginRequestModel): Promise<BaseApiResponseModel<LoginResponseModel>>;
}

export class AuthenRepo implements IAuthenRepo {
  async login(data: LoginRequestModel): Promise<BaseApiResponseModel<LoginResponseModel>> {
    console.log(ApiPath.LOGIN);
    
    return client.post(ApiPath.LOGIN, data);
  }
}

export const defaultAuthenRepo = new AuthenRepo();