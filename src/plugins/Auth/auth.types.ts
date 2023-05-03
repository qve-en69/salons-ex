
export interface IAuth {
    fetch(): Promise<void>;

    //load(): Promise<any>;

    // login(data: { data: LoginRequestType; fetchUser: boolean; staySignedIn: boolean }): Promise<any>;
    //
    // register(data: { data: SignupRequestType }): Promise<any>;
    //
    // logout(data: any): Promise<any>;
}
