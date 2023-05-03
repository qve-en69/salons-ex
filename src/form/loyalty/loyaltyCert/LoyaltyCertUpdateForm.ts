import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import { numeric, required, requiredIf } from 'vuelidate/lib/validators';
import { Component } from 'vue-property-decorator';
import { LoyaltyCertUpdateFormRequestType } from '@/form/loyalty/loyaltyCert/LoyaltyCertUpdateForm.types';
import { ILoyaltyCertListItem } from '@/entity/loyalty/loyaltyCert/loyaltyCert/loyaltyCert.types';
import { fio, email } from '@/utils/validators';
import LoyaltyCert from '@/entity/loyalty/loyaltyCert/loyaltyCert/loyaltyCert';

@Component
export default class LoyaltyCertUpdateForm extends Form {
    statuus = '1';
    code = 1;
    //@Validate(required, 'Введите ИНН')
    type = 1;
    //@Validate(required, 'Введите КПП')
    client_id = null;
    //@Validate(required, 'Введите контактное лицо')
    balance = 1;
    //@Validate(required, 'Введите номер телефона')
    product_group_id = null;
    active_from = null;
    //@Validate(required, 'Введите адрес')
    active_to = null;
    //@Validate(required, 'Выберите комментарий')
    getFormData(): LoyaltyCertUpdateFormRequestType {
        return {
            statuus: this.statuus == '1' ? true : false,
            code: this.code,
            type: this.type,
            client_id: this.client_id,
            balance: this.balance,
            product_group_id: this.product_group_id,
            active_from: this.active_from,
            active_to: this.active_to
        };
    }
    setFormData(loyaltyCert: ILoyaltyCertListItem): void {
        this.statuus = loyaltyCert.statuus ? '1' : '0';
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
        }
    // }
}
