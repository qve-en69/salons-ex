import { RequestType } from '@/form/form.types';

export type ClientCreateRequestType = RequestType & {
    name: string;
    phone: string;
    sex: number | null;
    birthday_date: string;
    comment: string;
    online: boolean;
    sold: number | null;
    paid: number | null;
    bonus_account_id: string | null;
    category: [];
    source: [];
    debt: number;
    salon_id: number | null;

};
