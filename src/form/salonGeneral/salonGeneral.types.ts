import { RequestType } from '@/form/form.types';
import {PartnerRequestType, PartnerResponseType} from "@/entity/common/partner.types";
import {LegalEntityResponseType} from "@/entity/common/legalEntity.types";

export type SalonGeneralRequestType = RequestType & {
    id: number;
    active: boolean;
    name: string;
    city_id: number | null;
    partner: PartnerResponseType;
    opening_date: string;
    address: string;
    social_network_link: string
    escort_manager_id: number | null;
    salon_group_id: number | null;
    conclusion_contract_date: string;
    currency_id: number | null;
    legal_entity_data: LegalEntityResponseType;
};
