import { RequestType } from '@/form/form.types';

export type LoyaltyBonusAddFormRequestType = RequestType & {
    bonus_programm_type_id: [];
    client_id: [];
    phone: string | null;
};
