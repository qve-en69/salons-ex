/*import {ILegalEntity, LegalEntityResponseType} from "@/entity/common/legalEntity.types";
import {IPartner, PartnerResponseType} from "@/entity/common/partner.types";
import {IManager, ManagerResponseType} from "@/entity/manager/manager.types";
import {GroupsResponseType, IGroups} from "@/entity/groups/groups.types";
import {CurrencyResponseType, ICurrency} from "@/entity/currency/currency.types";*/

export interface ILoyaltyCert {
    total: number;
    data: ILoyaltyCertListItem[];
}
export interface ILoyaltyCertListItem {
    statuus: boolean | null;
    code: number | null;
    type: number | null;
    client_id: number | null;
    balance: number | null;
    product_group_id: number | null;
    active_from: string | null;
    active_to: string | null;
}

export type LoyaltyCertResponseType = {
    total: number;
    data: LoyaltyCertListItemResponseType[];

};
export type LoyaltyCertListItemResponseType = {
    statuus: boolean;
    code: number | null;
    type: number | null;
    client_id: number | null;
    balance: number | null;
    product_group_id: number | null;
    active_from: string | null;
    active_to: string | null;
};
