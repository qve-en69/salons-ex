import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import { numeric, required, requiredIf } from 'vuelidate/lib/validators';
import { Component } from 'vue-property-decorator';
import { LoyaltyStockAddFormRequestType } from '@/form/loyalty/loyaltyStock/LoyaltyStockAddForm.types';
import { fio, email } from '@/utils/validators';
import { ISalons } from '@/entity/salons/salons.types';
import { IServices } from '@/entity/services/services.types';

@Component
export default class LoyaltyStockAddForm extends Form {
    @Validate(required, 'Введите название')
    name = '';
    @Validate(required, 'Введите описание')
    text = '';
    //@Validate(required, 'Введите КПП')
    active = false;
    image = null;
    @Validate(required, 'Введите значение')
    discount = 0;
    @Validate(required, 'Введите значение')
    discount_price = 1;
    price = 1;
    days: any | null = null;
    active_from = '';
    active_to = '';
    salons_id = ([] = []);
    services_id = ([] = []);
    salons: ISalons | null = null;
    service: IServices | null = null;
    getFormData(): LoyaltyStockAddFormRequestType {
        return {
            name: this.name,
            text: this.text,
            active: this.active,
            image: this.image,
            discount: this.discount,
            discount_price: this.discount_price,
            price: this.price,
            days: this.days,
            active_from: this.active_from,
            active_to: this.active_to,
            salons_id: this.salons_id,
            services_id: this.services_id
        };
    }
    setFormData(salons: ISalons | null, service: IServices | null): void {
        this.salons = salons;
        this.service = service;
    }
}
