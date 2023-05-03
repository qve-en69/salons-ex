export interface IUser {
    id: number;
    name: string;
    role_id: number;
    user_type_id: string | null;
    user_info: any;
    email: string | null;
    phone: string | null;
    img_path: string | null;
}
export type UserResponseType = {
    id: number;
    name: string;
    role_id: number;
    user_type_id: string | null;
    user_info: any | null;
    email: string | null;
    phone: string | null;
    img_path: string | null;
}