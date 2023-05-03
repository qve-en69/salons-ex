import { RequestType } from '@/form/form.types';

export type LoyaltySubscriptionTypeUpdateFormRequestType = RequestType & {
    name: string | null;
    price: number | null;
    validity: string | null;
    dimension: string | null;
    validity_period: string | null;
    membership_freezing: boolean | null;
    membership_freezing_period: string | null;
    online_pay_relevance: boolean | null;
};
