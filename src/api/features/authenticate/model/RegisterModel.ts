export interface RegisterRequestModel {
    family_name: string;  // Thay vì familyName
    name: string;        // Thay vì firstName
    email: string;
    password: string;
    phone_number: string; // Thay vì phone
    birthday: string;    // Thay vì birthdate
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