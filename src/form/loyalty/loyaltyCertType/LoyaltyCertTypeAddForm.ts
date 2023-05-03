import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import { required } from 'vuelidate/lib/validators';
import { Component } from 'vue-property-decorator';
import { LoyaltyCertTypeAddFormRequestType } from '@/form/loyalty/loyaltyCertType/LoyaltyCertTypeAddForm.types';
import { ISalons } from '@/entity/salons/salons.types';

@Component
export default class LoyaltyCertTypeAddForm extends Form {
    @Validate(required, 'Введите название')
    name = '';
    writeoff_id = 1;
    //@Validate(required, 'Введите ИНН')
    limit_id = null;
    //@Validate(required, 'Введите КПП')
    icon = null;
    //@Validate(required, 'Введите контактное лицо')
    @Validate(required, 'Введите сумму')
    balance = 0;
    //@Validate(required, 'Введите номер телефона')
    active_from = null;
    @Validate(required, 'Введите дату')
    active_to = null;
    //@Validate(required, 'Введите адрес')
    without_limit = 1;
    //@Validate(required, 'Выберите комментарий')
    pay_without_code = false;
    online_pay = false;
    services_id = ([] = []);
    salons_id = ([] = []);
    // eslint-disable-next-line @typescript-eslint/ban-types
    filials: {} | null = null;
    salons: ISalons | null = null;
    products_id = [];

    getFormData(): LoyaltyCertTypeAddFormRequestType {
        return {
            name: this.name,
            writeoff_id: this.writeoff_id,
            limit_id: this.limit_id,
            icon: this.icon,
            balance: this.balance,
            active_from: this.active_from,
            active_to: this.active_to,
            without_limit: this.without_limit,
            pay_without_code: this.pay_without_code,
            online_pay: this.online_pay,
            filials: this.filials,
            services_id: this.services_id,
            products_id: this.products_id,
            salons_id: this.salons_id,

        };
    }
    setFormData(salons: ISalons | null): void {
        this.salons = salons;
    }
}
