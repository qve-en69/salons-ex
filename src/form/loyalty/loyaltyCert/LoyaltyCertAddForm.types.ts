import { RequestType } from '@/form/form.types';

export type LoyaltyCertAddFormRequestType = RequestType & {
    statuus: boolean;
    code: number | null;
    type: [];
    client_id: [];
    balance: number | null;
    product_group_id: number | null;
    active_from: string | null;
    active_to: string | null;
};
