import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import { Component } from 'vue-property-decorator';
import { required, minLength, maxLength } from 'vuelidate/lib/validators';
import { LoyaltyBonusAddFormRequestType } from '@/form/loyalty/loyaltyBonus/LoyaltyBonusAddForm.types';
import { fio, email } from '@/utils/validators';
import { IClients } from '@/entity/clients/clients.types';
import { ILoyaltyBonusType } from '@/entity/loyalty/loyaltyBonus/loyaltyBonusType/LoyaltyBonusType.types';

@Component
export default class LoyaltyBonusAddForm extends Form {
    @Validate(required, 'Выберите значение')
    bonus_programm_type_id = ([] = []);
    @Validate(required, 'Выберите значение')
    //@Validate(required, 'Введите контактное лицо')
    client_id = ([] = []);
    //@Validate(required, 'Введите номер телефона')
    @Validate(required, 'Введите телефон')
    @Validate(minLength(18), 'укажите правильный номер телефона')
    @Validate(maxLength(18), 'укажите правильный номер телефона')
    phone = '';
    clients: IClients | null = null;
    loyaltyBonusTypes: ILoyaltyBonusType | null = null;
    getFormData(): LoyaltyBonusAddFormRequestType {
        return {
            bonus_programm_type_id: this.bonus_programm_type_id,
            client_id: this.client_id,
            phone: this.phone
        };
    }
    setFormData(clients: IClients | null, loyaltyBonusTypes: ILoyaltyBonusType | null): void {
        this.clients = clients;
        this.loyaltyBonusTypes = loyaltyBonusTypes;
    }
}
