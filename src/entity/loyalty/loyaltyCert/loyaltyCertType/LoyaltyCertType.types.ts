/*import {ILegalEntity, LegalEntityResponseType} from "@/entity/common/legalEntity.types";
import {IPartner, PartnerResponseType} from "@/entity/common/partner.types";
import {IManager, ManagerResponseType} from "@/entity/manager/manager.types";
import {GroupsResponseType, IGroups} from "@/entity/groups/groups.types";
import {CurrencyResponseType, ICurrency} from "@/entity/currency/currency.types";*/

export interface ILoyaltyCertType {
    total: number;
    data: ILoyaltyCertTypeListItem[];
}
export interface ILoyaltyCertTypeListItem {
    name: string | null;
    writeoff_id: number | null;
    balance: number | null;
    services_id: number[];
    products_id: number[];
    without_limit: boolean | null;
    pay_without_code: boolean | null;
    online_pay: boolean | null;
    // eslint-disable-next-line @typescript-eslint/ban-types
    filials: {} | null;
    // не видны поля
    limit_id: number | null;
    icon: number | null;
    active_from: string | null;
    active_to: string | null;
    statuus : boolean;
}

export type LoyaltyCertTypeResponseType = {
    total: number;
    data: LoyaltyCertTypeListItemResponseType[];
};
export type LoyaltyCertTypeListItemResponseType = {
    statuus : boolean;
    name: string | null;
    writeoff_id: number | null;
    balance: number | null;
    services_id: number[];
    products_id: number[];
    without_limit: boolean | null;
    pay_without_code: boolean | null;
    online_pay: boolean | null;
    // eslint-disable-next-line @typescript-eslint/ban-types
    filials: {} | null;
    // не видны поля
    limit_id: number | null;
    icon: number | null;
    active_from: string | null;
    active_to: string | null;
};
