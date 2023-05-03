/*import {ILegalEntity, LegalEntityResponseType} from "@/entity/common/legalEntity.types";
import {IPartner, PartnerResponseType} from "@/entity/common/partner.types";
import {IManager, ManagerResponseType} from "@/entity/manager/manager.types";
import {GroupsResponseType, IGroups} from "@/entity/groups/groups.types";
import {CurrencyResponseType, ICurrency} from "@/entity/currency/currency.types";*/

export interface ILoyaltyBonusType {
    total: number;
    data: ILoyaltyBonusTypeListItem[];
}
export interface ILoyaltyBonusTypeListItem {
    name: string | null;
    available_discount: number | null;
    comment: string | null;
}

export type LoyaltyBonusTypeResponseType = {
    total: number;
    data: LoyaltyBonusTypeListItemResponseType[];
};
export type LoyaltyBonusTypeListItemResponseType = {
    name: string | null;
    available_discount: number | null;
    comment: string | null;
};
