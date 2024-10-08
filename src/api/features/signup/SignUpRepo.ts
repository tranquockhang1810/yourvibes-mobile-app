// import { ApiPath } from "../../ApiPath";
// import { BaseApiResponseModel } from "../../baseApiResponseModel/baseApiResponseModel";
// import client from "../../client";
// import { SignUpRequestModel, SignUpResponseModel } from "../authenticate/model/SignUpModel";

// interface SignUp{
//     signUp(data: SignUpRequestModel): Promise<BaseApiResponseModel<SignUpResponseModel>>;
//   }
// export class SignUpRepo implements SignUp {
//     async signUp(data: SignUpRequestModel): Promise<BaseApiResponseModel<SignUpResponseModel>> {
//       return client.post(ApiPath.SIGNUP, data);
//     }
//   }
// export const defaultSignUpRepo = new SignUpRepo();