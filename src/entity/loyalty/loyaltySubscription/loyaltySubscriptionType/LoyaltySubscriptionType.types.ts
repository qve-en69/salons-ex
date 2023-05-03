/*import {ILegalEntity, LegalEntityResponseType} from "@/entity/common/legalEntity.types";
import {IPartner, PartnerResponseType} from "@/entity/common/partner.types";
import {IManager, ManagerResponseType} from "@/entity/manager/manager.types";
import {GroupsResponseType, IGroups} from "@/entity/groups/groups.types";
import {CurrencyResponseType, ICurrency} from "@/entity/currency/currency.types";*/

export interface ILoyaltySubscriptionType {
    total: number;
    data: ILoyaltySubscriptionTypeListItem[];
}
export interface ILoyaltySubscriptionTypeListItem {
    name: string | null;
    price: number | null;
    validity: string | null;
    dimension: string | null;
    validity_period: string | null;
    membership_freezing: boolean | null;
    membership_freezing_period: string | null;
    online_pay_relevance: boolean | null;
    // active_from: string | null;
    // active_to: string | null;
}

export type LoyaltySubscriptionTypeResponseType = {
    total: number;
    data: LoyaltySubscriptionTypeListItemResponseType[];
};
export type LoyaltySubscriptionTypeListItemResponseType = {
    name: string | null;
    price: number | null;
    validity: string | null;
    dimension: string | null;
    validity_period: string | null;
    membership_freezing: boolean | null;
    membership_freezing_period: string | null;
    online_pay_relevance: boolean | null;
    // active_from: string | null;
    // active_to: string | null;
};
