import { RequestType } from '@/form/form.types';
//import { ISources} from '@/entity/sources/sources.types';
//import { ICategory} from '@/entity/category/category.types';

export type ClientGeneralRequestType = RequestType & {
    id: number;
    name: string;
    phone: string;
    sex: number | null;
    birthday_date: string;
    comment: string;
    online: boolean;
    sold: number | null;
    paid: number | null;
    bonus_account_id: string | null;
    category: string | null;
    source: string | null;
    /* source : Array<ISources> | null;
    category : Array<ICategory> | null; */

    debt: number;
   
    //TODO:: Fix неправельный тип source, category
    /* 
    source: ISources[];
    category: ICategory[]; */
  
};
