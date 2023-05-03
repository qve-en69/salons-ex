import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import { numeric, required, requiredIf } from 'vuelidate/lib/validators';
import { Component } from 'vue-property-decorator';
import { LoyaltyStockUpdateFormRequestType } from '@/form/loyalty/loyaltyStock/LoyaltyStockUpdateForm.types';
import { ILoyaltyStockListItem } from '@/entity/loyalty/loyaltyStock/LoyaltyStock.types';
import { fio, email } from '@/utils/validators';

@Component
export default class LoyaltyStockUpdateForm extends Form {
    name = '';
    //@Validate(required, 'Введите ИНН')
    text = '';
    //@Validate(required, 'Введите КПП')
    active = false;
    image = 1;
    //@Validate(required, 'Введите контактное лицо')
    discount = 1;
    //@Validate(required, 'Введите номер телефона')
    discount_price = 1;
    price = 1;
    days = '';
    active_from = '';
    active_to = '';
    @Validate(email, 'Введите корректный Email')
    getFormData(): LoyaltyStockUpdateFormRequestType {
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
            active_to: this.active_to
        };
    }
    /* setFormData(item: ILoyaltyStockListItem | null): void {
        if (item !== undefined && item != null) {
            this.id = item.id;
            this.name = item.name;
            this.type = item.type.id;
            this.salon_id = item.salon_id;
            //this.status_data = item.status;
            this.inn = item.inn;
            this.kpp = item.kpp;
            this.contact_person = item.contact_person;
            this.phone = item.phone;
            this.email = item.email;
            this.address = item.address;
            this.comment = item.comment;
        }
    }*/
}
