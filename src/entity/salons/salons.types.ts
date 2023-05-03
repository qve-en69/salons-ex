import {ILegalEntity, LegalEntityResponseType} from "@/entity/common/legalEntity.types";
import {IPartner, PartnerResponseType} from "@/entity/common/partner.types";
import {IManager, ManagerResponseType} from "@/entity/manager/manager.types";
import {GroupsResponseType, IGroups} from "@/entity/groups/groups.types";
import {CurrencyResponseType, ICurrency} from "@/entity/currency/currency.types";

export interface ISalons {
    total: number;
    data: ISalonsListItem[];
}
export interface ISalonsListItem {
    id: number;
    name: string;
    city: {
        id: number;
        name: string;
    };
    address: string;
    opening_date: string;
    social_network_link: string;
    escort_manager_id: number;
    salon_group_id: string;
    partner: IPartner;
    conclusion_contract_date: string;
    currency_id: number;
    legal_entity: number;
    legal_entity_data: ILegalEntity;
    active: boolean;
    currencies: ICurrency;
    group: IGroups;
    manager: IManager;
}
export type SalonsResponseType = {
    total: number;
    data: SalonsListItemResponseType[];
}
export type SalonsListItemResponseType = {
    id: number;
    name: string;
    city: {
        id: number;
        name: string;
    };
    address: string;
    opening_date: string;
    social_network_link: string;
    escort_manager_id: number;
    salon_group_id: string;
    partner: PartnerResponseType;
    conclusion_contract_date: string;
    currency_id: number;
    legal_entity: number;
    legal_entity_data: LegalEntityResponseType;
    active: boolean;
    currencies: CurrencyResponseType;
    group: GroupsResponseType;
    manager: ManagerResponseType;
}
export enum ActiveNameEnum {
    Opened='Открыта',
    Progress='Запуск',
    Closed='Закрыта',
    Frozen='Заморожена'
}
