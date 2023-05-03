import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import { required, maxLength, minLength } from 'vuelidate/lib/validators';
import { Component } from 'vue-property-decorator';
import { ICategory } from '@/entity/category/category.types';
import { ISources } from '@/entity/sources/sources.types';
import { ISalons } from '@/entity/salons/salons.types'

import { ClientCreateRequestType } from '@/form/clientCreate/clientCreate.types';

@Component
export default class ClientCreateForm extends Form {
    @Validate(required, 'Введите ФИО')
    name = '';
    @Validate(required, 'пожалуйста укажите телефон')
    @Validate(maxLength(18), 'укажите правильный телефон')
    @Validate(minLength(18), 'укажите правильный телефон')
    phone = '';
    sex: number | null = null;
    birthday_date = '';
    comment = '';
    source = [] = [];
    categor = [] = [];
    sold: number | null = null;
    paid: number | null = null;
    bonus_account_id = '';
    sources: ISources[] = [];
    category: ICategory[] = [];
    salons: ISalons | null  = null;
    online = true;
    activeSex = [
        { id: 1, name: 'Мужской' },
        { id: 2, name: 'Женский' },
        { id: 3, name: 'Неизвестно' }
    ];
    debt = 10;
    @Validate(required, 'Укажите студию')
    salon_id = null;

    getFormData(): ClientCreateRequestType {
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
            debt: this.debt,
            salon_id: this.salon_id
        };
    }
    setFormData(sources: ISources[], category: ICategory[], salons:ISalons | null): void {
        this.sources = sources;
        this.category = category;
        this.salons = salons;
    }
}
