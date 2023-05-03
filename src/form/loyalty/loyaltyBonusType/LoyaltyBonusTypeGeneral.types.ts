import { RequestType } from '@/form/form.types';

export type LoyaltyBonusTypeGeneralRequestType = RequestType & {
    name: string | null;
    available_discount: number | null;
    comment: string | null;
};
