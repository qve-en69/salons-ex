import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import { numeric, required, requiredIf } from 'vuelidate/lib/validators';
import { Component } from 'vue-property-decorator';
import { LoyaltySubscriptionTypeUpdateFormRequestType } from '@/form/loyalty/loyaltySubscriptionType/LoyaltySubscriptionTypeUpdateForm.types';
import { ILoyaltySubscriptionTypeListItem } from '@/entity/loyalty/loyaltySubscription/loyaltySubscriptionType/LoyaltySubscriptionType.types';
import { fio, email } from '@/utils/validators';

@Component
export default class LoyaltySubscriptionTypeUpdateForm extends Form {
    name = '';
    price = 0;
    //@Validate(required, 'Введите ИНН')
    validity = '';
    //@Validate(required, 'Введите КПП')
    dimension = '';
    //@Validate(required, 'Введите контактное лицо')
    validity_period = '';
    //@Validate(required, 'Введите номер телефона')
    membership_freezing = false;
    membership_freezing_period = '';
    //@Validate(required, 'Введите адрес')
    online_pay_relevance = false;
    //@Validate(required, 'Выберите комментарий')
    active_from = ([] = []);
    active_to = ([] = []);
    // salons: ISalons | null = null;
    // serviceCategory: IServicesCategory | null = null;
    getFormData(): LoyaltySubscriptionTypeUpdateFormRequestType {
        return {
            name: this.name,
            price: this.price,
            validity: this.validity,
            dimension: this.dimension,
            validity_period: this.validity_period,
            membership_freezing: this.membership_freezing,
            membership_freezing_period: this.membership_freezing_period,
            online_pay_relevance: this.online_pay_relevance
        };
    }
    // setFormData(item: ILoyaltySubscriptionTypeListItem | null): void {
    //     if (item !== undefined && item != null) {
    //         this.name = item.name;
    //         this.discount = item.discount
    //         //this.status_data = item.status;
    //         this.status = item.status;
    //         this.validity = item.validity;
    //         this.price = item.price;
    //         this.paid = item.paid;
    //         this.sum = item.sum;
    //         this.online_pay_relevance = item.online_pay_relevance;
    //         this.active_from = item.active_from;
    //         this.active_to = item.active_to
    //     }
    // }
}
