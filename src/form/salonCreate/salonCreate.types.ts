import { RequestType } from '@/form/form.types';
import {PartnerRequestType, PartnerResponseType} from "@/entity/common/partner.types";
import {LegalEntityResponseType} from "@/entity/common/legalEntity.types";

export type SalonCreateRequestType = RequestType & {
    active: boolean;
    salon_name: string;
    city_id: number | null;
    partner: PartnerRequestType;
    opening_date: string;
    address: string;
    social_network_link: string
    escort_manager_id: number | null;
    salon_group_id: number | null;
    conclusion_contract_date: string;
    currency_id: number | null;
    legal_entity_name: string;
    legal_address: string;
    INN: string;
    KPP: string;
    RCBIC: string;
    bank_name: string;
    correspondent_account: string;
    checking_account: string;
};