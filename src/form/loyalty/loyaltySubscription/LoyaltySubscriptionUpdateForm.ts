import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import { numeric, required, requiredIf } from 'vuelidate/lib/validators';
import { Component } from 'vue-property-decorator';
import { LoyaltySubscriptionUpdateFormRequestType } from '@/form/loyalty/loyaltySubscription/LoyaltySubscriptionUpdateForm.types';
import { ILoyaltySubscriptionListItem } from '@/entity/loyalty/loyaltySubscription/loyaltySubscription/LoyaltySubscription.types';
import { fio, email } from '@/utils/validators';

@Component
export default class LoyaltySubscriptionUpdateForm extends Form {
    phone = '';
    status = 0;    //@Validate(required, 'Введите ИНН')
    membership_number = 1;
    //@Validate(required, 'Введите КПП')
    discount = 1;
    //@Validate(required, 'Введите контактное лицо')
    client_id = 1;
    //@Validate(required, 'Введите номер телефона')
    abonement_type_id = 1;

    getFormData(): LoyaltySubscriptionUpdateFormRequestType {
        return {
            status: this.status,
            phone: this.phone,
            membership_number: this.membership_number,
            discount: this.discount,
            client_id: this.client_id,
            abonement_type_id: this.abonement_type_id
        };
    }
    // setFormData(item: ILoyaltySubscriptionListItem | null): void {
    //     if (item !== undefined && item != null) {
    //         this.name = item.name;
    //         this.discount = item.discount;
    //         //this.status_data = item.status;
    //         this.status = item.status;
    //         this.validity = item.validity;
    //         this.price = item.price;
    //         this.paid = item.paid;
    //         this.sum = item.sum;
    //         this.online_pay_relevance = item.online_pay_relevance;
    //         this.active_from = item.active_from;
    //         this.active_to = item.active_to;
    //     }
    // }
}
