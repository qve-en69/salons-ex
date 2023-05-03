import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import { numeric, required, requiredIf } from 'vuelidate/lib/validators';
import { Component } from 'vue-property-decorator';
import { LoyaltyBonusUpdateFormRequestType } from '@/form/loyalty/loyaltyBonus/LoyaltyBonusUpdateForm.types';
import { ILoyaltyBonusListItem } from '@/entity/loyalty/loyaltyBonus/loyaltyBonus/LoyaltyBonus.types';
import { fio, email } from '@/utils/validators';

@Component
export default class LoyaltyBonusUpdateForm extends Form {
    bonus_programm_type_id = 1;
    //@Validate(required, 'Введите контактное лицо')
    client_id = 1;
    //@Validate(required, 'Введите номер телефона')
    phone = '';
    getFormData(): LoyaltyBonusUpdateFormRequestType {
        return {
            bonus_programm_type_id: this.bonus_programm_type_id,
            client_id: this.client_id,
            phone: this.phone
        };
    }
    // setFormData(item: ILoyaltyBonusListItem | null): void {
    //     if (item !== undefined && item != null) {
    //         this.bonus_programm_type_id = item.bonus_programm_type_id;
    //         this.client_id = item.client_id;
    //         this.phone = item.phone;

    //     }
    // }
}
