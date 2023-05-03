import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import { numeric, required, requiredIf } from 'vuelidate/lib/validators';
import { Component } from 'vue-property-decorator';
import { LoyaltySubscriptionTypeAddFormRequestType } from '@/form/loyalty/loyaltySubscriptionType/LoyaltySubscriptionTypeAddForm.types';
import { fio, email } from '@/utils/validators';
import { ISalons } from '@/entity/salons/salons.types';
import { IServicesCategory } from '@/entity/servicesCategory/services.category.types';
import { IServices } from '@/entity/services/services.types';

@Component
export default class LoyaltySubscriptionTypeAddForm extends Form {
    @Validate(required, 'Введите название')
    name = '';
    @Validate(required, 'Введите стоимость')
    price = 0;
    @Validate(required, 'Введите срок дейсвтия')
    validity = '';
    @Validate(required, 'Выберите единицу измерения')
    dimension = '';
    @Validate(required, 'Введите параметр учитывания')
    validity_period = '';
    //@Validate(required, 'Введите номер телефона')
    membership_freezing = false;
    membership_freezing_period = '';
    //@Validate(required, 'Введите адрес')
    online_pay_relevance = false;
    //@Validate(required, 'Выберите комментарий')
    active_from = ([] = []);
    active_to = ([] = []);
    salons: ISalons | null = null;
    serviceCategory: IServicesCategory | null = null;
    service: IServices | null = null;
    getFormData(): LoyaltySubscriptionTypeAddFormRequestType {
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
    setFormData(salons: ISalons | null, serviceCategory: IServicesCategory | null): void {
        this.salons = salons;
        this.serviceCategory = serviceCategory;
    }
}
