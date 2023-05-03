import {IUser, UserResponseType} from "@/entity/user/user.types";

export default class User implements IUser {
    id: number;
    name: string;
    role_id: number;
    user_type_id: string | null;
    user_info: any;
    email: string | null;
    phone: string | null;
    img_path: string | null;
    constructor(data: UserResponseType) {
        this.id = data.id;
        this.name = data.name;
        this.role_id = data.role_id;
        this.user_type_id = data.user_type_id;
        this.user_info = data.user_info;
        this.email = data.email;
        this.phone = data.phone;
        this.img_path = data.img_path;
    }
}