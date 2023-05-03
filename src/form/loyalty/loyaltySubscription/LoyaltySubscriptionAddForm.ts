import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import { numeric,minLength,maxLength, required, requiredIf } from 'vuelidate/lib/validators';
import { Component } from 'vue-property-decorator';
import { LoyaltySubscriptionAddFormRequestType } from '@/form/loyalty/loyaltySubscription/LoyaltySubscriptionAddForm.types';
import { fio, email } from '@/utils/validators';
import { IClients } from '@/entity/clients/clients.types';
import { ILoyaltySubscriptionType } from '@/entity/loyalty/loyaltySubscription/loyaltySubscriptionType/LoyaltySubscriptionType.types';

@Component
export default class LoyaltySubscriptionAddForm extends Form {
    status = 0;
    @Validate(required, 'Введите телефон')
    @Validate(minLength(18), 'укажите правильный номер телефона')
    @Validate(maxLength(18), 'укажите правильный номер телефона')
    phone = '';
    //@Validate(required, 'Введите ИНН')
    membership_number = 1;
    @Validate(required, 'Введите значение')
    discount = 1;
    //@Validate(required, 'Введите контактное лицо')
    client_id = ([] = []);
    //@Validate(required, 'Введите номер телефона')
    abonement_type_id = ([] = []);
    clients: IClients | null = null;
    loyaltySubscriptionTypes: ILoyaltySubscriptionType | null = null;
    getFormData(): LoyaltySubscriptionAddFormRequestType {
        return {
            status: this.status,
            phone: this.phone,
            membership_number: this.membership_number,
            discount: this.discount,
            client_id: this.client_id,
            abonement_type_id: this.abonement_type_id
        };
    }
    setFormData(clients: IClients | null, loyaltySubscriptionTypes: ILoyaltySubscriptionType | null): void {
        this.clients = clients;
        this.loyaltySubscriptionTypes = loyaltySubscriptionTypes;
    }
}
