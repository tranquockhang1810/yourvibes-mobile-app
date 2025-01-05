import { BaseApiResponseModel } from "@/src/api/baseApiResponseModel/baseApiResponseModel";

export interface ForgotPasswordResponseModel extends BaseApiResponseModel<ForgotPasswordResponseModel> {
    message: string;
}
