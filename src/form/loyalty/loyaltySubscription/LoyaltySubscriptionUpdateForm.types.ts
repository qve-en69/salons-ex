import { RequestType } from '@/form/form.types';

export type LoyaltySubscriptionUpdateFormRequestType = RequestType & {
    status: number | null;
    phone: string | null;
    membership_number: number | null;
    discount: number | null;
    client_id: number | null;
    abonement_type_id: number | null;
};

