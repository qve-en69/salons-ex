import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import {maxLength, minLength, required} from 'vuelidate/lib/validators';
import { Component } from 'vue-property-decorator';
import { ICategory} from '@/entity/category/category.types';
import { ISources} from '@/entity/sources/sources.types';
import { ISalons } from '@/entity/salons/salons.types';
import { IClientsListItem } from '@/entity/clients/clients.types';

import { ClientGeneralRequestType } from '@/form/clientGeneral/clientGeneral.types';
import { ClientCreateRequestType } from '@/form/clientCreate/clientCreate.types';
//import { ClientCreateRequestType } from '@/form/clientCreate/clientCreate.types';

@Component
export default class ClientGeneralForm extends Form {
    @Validate(required, 'Введите ФИО')
    name = '';
    @Validate(required, 'Введите телефон')
    @Validate(maxLength(18), 'укажите правильный номер телефона')
    @Validate(minLength(18), 'укажите правильный номер телефона')
    phone = '';
    sex: number | null = null;
    birthday_date = '';
    comment = '';

    source= '';
    category= '';
   
    /* source :  ISources[]=[];
    category : ICategory[]=[]; */

    sold: number | null = null;
    paid: number | null = null;
    bonus_account_id: string | null = null;

    salon_id: number | null = null;
    
    online = true;
    activeSex = [
        { id: 1, name: 'Мужской' },
        { id: 2, name: 'Женский' }
    ];
    sources: Array<ISources> | null = null;
    categories: Array<ICategory> | null = null;

    debt = 0;
    id = 0;

    /*getFormData(): ClientCreateRequestType {
        return {
            name: this.name,
            phone: this.phone,
            sex: this.sex,
            category: this.categor,
            birthday_date: this.birthday_date,
            comment: this.comment,
            online: this.online,
            sold: this.sold,
            paid: this.paid,
            bonus_account_id: this.bonus_account_id,
            source: this.source,
            debt: this.debt
        };
    }
    setFormData(sources: ISources[], category: ICategory[]): void {
        console.log('ClientCreate Sources - '+ sources)
        this.sources = sources;
        this.category = category;
    }*/

    getFormData(): ClientGeneralRequestType {
        return {

            id: this.id,
            name: this.name,
            phone: this.phone,
            sex: this.sex,

            birthday_date: this.birthday_date,
            comment: this.comment,
            online: this.online,
            sold: this.sold,
            paid: this.paid,
            bonus_account_id: this.bonus_account_id,

            source: this.source,
            category: this.category,
            debt: this.debt,
        };
    }
    setFormData(sources: ISources[], categories: ICategory[], client: IClientsListItem): void {
              if (client !== undefined) {
                this.id = client.id;
    
                this.name = client.name;
                this.phone = client.phone;
                this.sex = client.sex;
                this.birthday_date = client.birthday_date;
                this.comment = client.comment;
                this.online = client.online;
                this.sold = client.sold;
                this.paid = client.paid;
                this.bonus_account_id = client.bonus_account_id;

                this.salon_id = client.salon_id;
                
                //console.log('client source -'+ client.source.length)
                
                //this.source =  JSON.parse(`[${client.source}]`.replaceAll("'", '"')) 
                this.source = JSON.parse(client.source);
                this.category = JSON.parse(client.category);
                //this.category = JSON.parse(`[${client.category}]`.replaceAll("'", '"'))
    
                this.sources = sources;
                this.categories = categories;

            }  

    }
}
