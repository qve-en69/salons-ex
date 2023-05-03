export interface IAccount {
    id: number
    RCBIC: number;
    bank_name: string;
    correspondent_account: number;
    checking_account: number;
}
export type AccountResponseType = {
    id: number
    RCBIC: number;
    bank_name: string;
    correspondent_account: number;
    checking_account: number;
}