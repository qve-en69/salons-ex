import {IAccount} from "@/entity/common/account.types";

export interface ILegalEntity {
    id: number;
    name: string;
    legal_address: string;
    actual_address: string;
    INN: number;
    KPP: number;
    account: IAccount;
}
export type LegalEntityResponseType = {
    id: number;
    name: string;
    legal_address: string;
    actual_address: string;
    INN: number;
    KPP: number;
    account: IAccount;
}