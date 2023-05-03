import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import { numeric, required, requiredIf } from 'vuelidate/lib/validators';
import { Component } from 'vue-property-decorator';
import { LoyaltyCertTypeUpdateFormRequestType } from '@/form/loyalty/loyaltyCertType/LoyaltyCertTypeUpdateForm.types';
import { ILoyaltyCertTypeListItem } from '@/entity/loyalty/loyaltyCert/loyaltyCertType/LoyaltyCertType.types';
import { fio, email } from '@/utils/validators';

@Component
export default class LoyaltyCertTypeUpdateForm extends Form {
    @Validate(required, 'Выберите тип')
    name = '';
    writeoff_id = 1;
    //@Validate(required, 'Введите ИНН')
    limit_id = null;
    //@Validate(required, 'Введите КПП')
    icon = null;
    //@Validate(required, 'Введите контактное лицо')
    balance = 0;
    //@Validate(required, 'Введите номер телефона')
    active_from = null;
    active_to = null;
    //@Validate(required, 'Введите адрес')
    without_limit = null;
    //@Validate(required, 'Выберите комментарий')
    pay_without_code = null;
    online_pay = false;
    // eslint-disable-next-line @typescript-eslint/ban-types
    filials: {} | null = null;
    services_id = [];
    products_id = [];
    getFormData(): LoyaltyCertTypeUpdateFormRequestType {
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
            products_id: this.products_id
        };
    }
    // setFormData(item: ILoyaltyCertTypeListItem | null): void {
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
