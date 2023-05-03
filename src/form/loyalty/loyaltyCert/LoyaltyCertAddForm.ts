import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import { required } from 'vuelidate/lib/validators';
import { Component } from 'vue-property-decorator';
import { LoyaltyCertAddFormRequestType } from '@/form/loyalty/loyaltyCert/LoyaltyCertAddForm.types';
import { ILoyaltyCertTypeForm } from '@/entity/loyaltyCertTypeForm/loyaltyCertTypeForm.types';
import { IClients } from '@/entity/clients/clients.types';
import {ILoyaltyCertListItem} from "@/entity/loyalty/loyaltyCert/loyaltyCert/loyaltyCert.types";
import { ILoyaltyCertType } from '@/entity/loyalty/loyaltyCert/loyaltyCertType/LoyaltyCertType.types';

@Component
export default class LoyaltyCertAddForm extends Form {
    statuus = '1';
    statusList = [
        {id: '0', name: 'Не активна'},
        {id: '1', name: 'Активна'}
    ]
    code = Math.floor(100000000000 + Math.random() * 900000000000);
    @Validate(required, 'Выберите тип')
    type = ([] = []);
    //@Validate(required, 'Введите КПП')
    client_id = ([] = []);
    //@Validate(required, 'Введите контактное лицо')
    @Validate(required, 'Введите сумму')
    balance = 0;
    //@Validate(required, 'Введите номер телефона')
    product_group_id = null;
    active_from = null;
    //@Validate(required, 'Введите адрес')
    active_to = null;
    //@Validate(required, 'Выберите комментарий')
    clients: IClients | null = null;
    loyaltyCertTypes: ILoyaltyCertType | null = null;
    LoyaltyCerts: ILoyaltyCertListItem | null = null;
    //statuus : LoyaltyCerts | null = null;
    getFormData(): LoyaltyCertAddFormRequestType {
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
    setFormData(clients: IClients | null, loyaltyCertTypes: ILoyaltyCertType | null, LoyaltyCerts : ILoyaltyCertListItem): void {
        this.clients = clients;
        this.loyaltyCertTypes = loyaltyCertTypes;
        this.LoyaltyCerts = LoyaltyCerts;

    }
}
