export interface ProfileRequestModel {
    id: string; 
}
export interface ProfileResponseModel {
    familyName: string;       // Họ
    name: string;             // Tên
    email: string;            // Địa chỉ email
    phoneNumber: string;      // Số điện thoại
    birthday: string;         // Ngày sinh (dạng chuỗi, có thể là ISO 8601)
    avatarUrl?: string;       // URL ảnh đại diện (có thể không có)
    capwallUrl?: string;      // URL ảnh bìa (có thể không có)
    privacy: string;          // Mức độ riêng tư
    createdAt: string;        // Thời gian tạo (dạng chuỗi, có thể là ISO 8601)
    posts?: Post[];           // Danh sách bài viết (có thể không có)
}

export interface Post {
}
