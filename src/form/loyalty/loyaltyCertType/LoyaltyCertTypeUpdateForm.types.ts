import { RequestType } from '@/form/form.types';

export type LoyaltyCertTypeUpdateFormRequestType = RequestType & {
    name: string | null;
    writeoff_id: number | null;
    balance: number | null;
    services_id: number[];
    products_id: number[];
    without_limit: boolean | null;
    pay_without_code: boolean | null;
    online_pay: boolean | null;
    // eslint-disable-next-line @typescript-eslint/ban-types
    filials: {} | null;
    // не видны поля
    limit_id: number | null;
    icon: number | null;
    active_from: string | null;
    active_to: string | null;
};
