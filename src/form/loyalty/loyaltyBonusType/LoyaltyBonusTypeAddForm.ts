import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import { numeric, required, requiredIf } from 'vuelidate/lib/validators';
import { Component } from 'vue-property-decorator';
import { LoyaltyBonusTypeAddFormRequestType } from '@/form/loyalty/loyaltyBonusType/LoyaltyBonusTypeAddForm.types';
import { fio, email } from '@/utils/validators';

@Component
export default class LoyaltyBonusTypeAddForm extends Form {
    @Validate(required, 'Введите название')
    name = '';
    @Validate(required, 'Введите значение')
    available_discount = 0;
    comment = '';
    getFormData(): LoyaltyBonusTypeAddFormRequestType {
        return {
            name: this.name,
            available_discount: this.available_discount,
            comment: this.comment
        };
    }
    // setFormData(salon: number): void {
    //     this.salon_id = salon;
    // }
}
