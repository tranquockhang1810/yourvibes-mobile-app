export interface VerifyOTPRequestModel { 
    email: string
}

export interface VerifyOTPResponseModel {
    code: number
    message: string
    data: any
}