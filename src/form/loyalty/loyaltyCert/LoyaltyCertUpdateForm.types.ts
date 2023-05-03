import { RequestType } from '@/form/form.types';

export type LoyaltyCertUpdateFormRequestType = RequestType & {
    statuus: boolean;
    code: number | null;
    type: number | null;
    client_id: number | null;
    balance: number | null;
    product_group_id: number | null;
    active_from: string | null;
    active_to: string | null;
};
