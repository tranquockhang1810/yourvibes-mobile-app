import { TransferToFormData } from "@/src/utils/helper/TransferToFormData";
import { ApiPath } from "../../ApiPath";
import { BaseApiResponseModel } from "../../baseApiResponseModel/baseApiResponseModel";
import client from "../../client";
import { UserModel } from "../authenticate/model/LoginModel";
import { UpdateProfileRequestModel } from "./model/UpdateProfileModel";

interface IProfileRepo {
  getProfile(userId: string): Promise<BaseApiResponseModel<UserModel>>;
  updateProfile(data: UpdateProfileRequestModel): Promise<BaseApiResponseModel<UserModel>>;
}

export class ProfileRepo implements IProfileRepo {
  async getProfile(userId: string): Promise<BaseApiResponseModel<UserModel>> {
    return client.get(ApiPath.PROFILE + userId);
  }
  async updateProfile(data: UpdateProfileRequestModel): Promise<BaseApiResponseModel<UserModel>> {
    const formData = TransferToFormData(data);
    return client.patch(ApiPath.PROFILE, formData, { headers: { "Content-Type": "multipart/form-data" } });
  }
}

export const defaultProfileRepo = new ProfileRepo();