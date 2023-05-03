import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import { numeric, required, requiredIf } from 'vuelidate/lib/validators';
import { Component } from 'vue-property-decorator';
import { LoyaltyBonusTypeUpdateFormRequestType } from '@/form/loyalty/loyaltyBonusType/LoyaltyBonusTypeUpdateForm.types';
import { ILoyaltyBonusTypeListItem } from '@/entity/loyalty/loyaltyBonus/loyaltyBonusType/LoyaltyBonusType.types';
import { fio, email } from '@/utils/validators';

@Component
export default class LoyaltyBonusTypeUpdateForm extends Form {
    name = '';
    available_discount = 1;
    comment = '';
    getFormData(): LoyaltyBonusTypeUpdateFormRequestType {
        return {
            name: this.name,
            available_discount: this.available_discount,
            comment: this.comment
        };
    }
    // setFormData(item: ILoyaltyBonusTypeListItem | null): void {
    //     if (item !== undefined && item != null) {
    //         this.id = item.id;
    //         this.name = item.name;
    //         this.type = item.type.id;
    //         this.salon_id = item.salon_id;
    //         //this.status_data = item.status;
    //         this.inn = item.inn;
    //         this.kpp = item.kpp;
    //         this.contact_person = item.contact_person;
    //         this.phone = item.phone;
    //         this.email = item.email;
    //         this.address = item.address;
    //         this.comment = item.comment;
    //     }
    // }
}
