/*import {ILegalEntity, LegalEntityResponseType} from "@/entity/common/legalEntity.types";
import {IPartner, PartnerResponseType} from "@/entity/common/partner.types";
import {IManager, ManagerResponseType} from "@/entity/manager/manager.types";
import {GroupsResponseType, IGroups} from "@/entity/groups/groups.types";
import {CurrencyResponseType, ICurrency} from "@/entity/currency/currency.types";*/

export interface ILoyaltyStock {
    total: number;
    data: ILoyaltyStockListItem[];
}
export interface ILoyaltyStockListItem {
    name: string | null;
    text: string | null;
    active: boolean | null;
    image: number | null;
    discount: number | null;
    discount_price: number | null;
    price: number | null;
    days: string | null;
    active_from: string | null;
    active_to: string | null;
}

export type LoyaltyStockResponseType = {
    total: number;
    data: LoyaltyStockListItemResponseType[];
};
export type LoyaltyStockListItemResponseType = {
    name: string | null;
    text: string | null;
    active: boolean | null;
    image: number | null;
    discount: number | null;
    discount_price: number | null;
    price: number | null;
    days: string | null;
    active_from: string | null;
    active_to: string | null;
};
