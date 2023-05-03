/*import {ILegalEntity, LegalEntityResponseType} from "@/entity/common/legalEntity.types";
import {IPartner, PartnerResponseType} from "@/entity/common/partner.types";
import {IManager, ManagerResponseType} from "@/entity/manager/manager.types";
import {GroupsResponseType, IGroups} from "@/entity/groups/groups.types";
import {CurrencyResponseType, ICurrency} from "@/entity/currency/currency.types";*/

export interface ILoyaltySubscription {
    total: number;
    data: ILoyaltySubscriptionListItem[];
}
export interface ILoyaltySubscriptionListItem {
    status: string | null;
    phone: string | null;
    membership_number: number | null;
    discount: number | null;
    client_id: number | null;
    abonement_type_id: number | null;
}

export type LoyaltySubscriptionResponseType = {
    total: number;
    data: LoyaltySubscriptionListItemResponseType[];
};
export type LoyaltySubscriptionListItemResponseType = {
    status: string | null;
    phone: string | null;
    membership_number: number | null;
    discount: number | null;
    client_id: number | null;
    abonement_type_id: number | null;
};
