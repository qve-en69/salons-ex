/*import {ILegalEntity, LegalEntityResponseType} from "@/entity/common/legalEntity.types";
import {IPartner, PartnerResponseType} from "@/entity/common/partner.types";
import {IManager, ManagerResponseType} from "@/entity/manager/manager.types";
import {GroupsResponseType, IGroups} from "@/entity/groups/groups.types";
import {CurrencyResponseType, ICurrency} from "@/entity/currency/currency.types";*/

export interface ILoyaltyBonus {
    total: number;
    data: ILoyaltyBonusListItem[];
}
export interface ILoyaltyBonusListItem {
    bonus_programm_type_id: number | null;
    client_id: number | null;
    phone: string | null;
}

export type LoyaltyBonusResponseType = {
    total: number;
    data: LoyaltyBonusListItemResponseType[];
};
export type LoyaltyBonusListItemResponseType = {
    bonus_programm_type_id: number | null;
    client_id: number | null;
    phone: string | null;
};
