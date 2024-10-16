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
} 
