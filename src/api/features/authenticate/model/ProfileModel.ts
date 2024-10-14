export interface ProfileRequestModel {
    id: string;  
}
export interface ProfileResponseModel {
    family_name: string;       
    name: string;             
    email: string;            
    phone_number: string;      
    birthday: string;         
    avatar_url?: string;       
    capwall_url?: string;     
    privacy: string;          
    created_at: string;   
    validator: "";
    auth_type: "";
    post_count: 0,
    status: false,     
    posts?: Post[];          
}
export interface Post {
    id: string;                
    created_at: string;        
    updated_at?: string;       
    likes: number;            
    comments?: Comment[];     
}

export interface Comment {         
}
