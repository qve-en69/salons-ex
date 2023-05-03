import { CategoryClientResponseType } from '../category/category.types';
import { SourcesResponseType } from '../sources/sources.types';

export interface IClients {
    total: number;
    data: IClientsListItem[];
}
export interface IClientsListItem {
    id: number;
    name: string;
    phone: string;
    sex: number;
    birthday_date: string;
    comment: string;
    online: boolean;
    sold: number | null;
    paid: number | null;
    bonus_account_id: string | null;
    salon_id: number | null;
    source : '';
    category: '';

    /* source : Array<ISources>;
    category: Array<ICategory>; */
    debt: number;
}
export type ClientsResponseType = {
    total: number;
    data: IClientsListItem[];
};
export type ClientsListItemResponseType = {
    id: number;
    name: string;
    phone: string;
    sex: number;
    birthday_date: string;
    comment: string;
    online: boolean;
    sold: string | null;
    paid: string | null;
    bonus_account_id: string | null;
    sources:  SourcesResponseType;
    source: SourcesResponseType;
    category: CategoryClientResponseType;
    categories:  CategoryClientResponseType;
    debt: number;
};