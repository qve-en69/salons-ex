import { RequestType } from '@/form/form.types';

export type LoyaltySubscriptionAddFormRequestType = RequestType & {
    status: number | null;
    phone: string | null;
    membership_number: number | null;
    discount: number | null;
    client_id: [];
    abonement_type_id: [];
};
