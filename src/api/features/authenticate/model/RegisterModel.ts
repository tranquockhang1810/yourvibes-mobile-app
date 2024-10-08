// export interface RegisterRequestModel {
//     family_name: string;
//     name : string;
//     phone_number : string;
//     birthday : string;
//     email: string;
//     password: string;
//     confirmPassword: string;
//     otp: string;
//     checkbox: boolean;
// }

import dayjs from "dayjs";

export interface RegisterRequestModel {
    family_name: string;  // Thay vì familyName
    name: string;        // Thay vì firstName
    email: string;
    password: string;
    confirmPassword: string;
    phone_number: string; // Thay vì phone
    birthday: dayjs.Dayjs;    // Thay vì birthdate
    otp: string;
  }
  

export interface RegisterResponseModel {
    token?: string;
    user?: {
        id?: string
        name?: string
        avatar?: string
    }
    id?: string
    name?: string
    avatar?: string
}