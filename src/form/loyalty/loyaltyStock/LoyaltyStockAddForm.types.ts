import { RequestType } from '@/form/form.types';

export type LoyaltyStockAddFormRequestType = RequestType & {
    name: string | null;
    text: string | null;
    active: boolean | null;
    image: number | null;
    discount: number | null;
    discount_price: number | null;
    price: number | null;
    days: {} | null;
    active_from: string | null;
    active_to: string | null;
    salons_id: [];
    services_id: [];
};
