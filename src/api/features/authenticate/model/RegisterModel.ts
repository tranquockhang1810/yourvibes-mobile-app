export interface RegisterRequestModel {
    familyName: string;
    firstName: string;
    phone: string;
    birthdate: string;
    email: string;
    password: string;
    confirmPassword: string;
    otp: string;
    checkbox: boolean;
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