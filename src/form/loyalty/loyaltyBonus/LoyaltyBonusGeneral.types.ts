import { RequestType } from '@/form/form.types';

export type LoyaltyBonusGeneralRequestType = RequestType & {
    bonus_programm_type_id: number | null;
    client_id: number | null;
    phone: string | null;
};
