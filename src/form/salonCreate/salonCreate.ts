import {Form} from "@/form/form";
import {Validate} from "@/plugins/Vuelidate/Decorators";
import {numeric, required} from "vuelidate/lib/validators";
import {Component} from "vue-property-decorator";
import {ICity} from "@/entity/territory/territory.types";
import {IGroups} from "@/entity/groups/groups.types";
import {ICurrency} from "@/entity/currency/currency.types";
import {IManager} from "@/entity/manager/manager.types";
import {fio, email, phone} from "@/utils/validators";
import {SalonCreateRequestType} from "@/form/salonCreate/salonCreate.types";

@Component
export default class SalonCreateForm extends Form {
    @Validate(required, 'Введите неаименование студии')
    name = '';
    @Validate(required, 'Введите город')
    city: number | null = null;
    //@Validate(required, 'Введите название юр. лица')
    entity = '';
    //@Validate(required, 'Введите юр. адрес')
    legalAddr = '';
    @Validate(required, 'Введите фактический адрес')
    actualAddr = '';
    //@Validate(required, 'Введите ИНН')
    inn = '';
    //@Validate(required, 'Введите КПП')
    kpp = '';
    //@Validate(required, 'Введите БИК')
    bik = '';
    //@Validate(required, 'Введите название банка')
    bank = '';
    //@Validate(required, 'Введите корр. счет')
    corr = '';
   // @Validate(required, 'Введите расчетный счет')
    checkingAcc = '';
    //@Validate(required, 'Введите дату заключения договора')
    dateDoc = '';
    //@Validate(required, 'Введите менеджера сопровождения')
    manager: number | null = null;
    //@Validate(required, 'Введите группу')
    group: number | null = null;
    //@Validate(required, 'Введите валюту')
    currency: number | null = null;
    //@Validate(required, 'Введите дату открытия')
    openingDate = '';
    //@Validate(fio, 'Введите корректное ФИО')
    partner = '';
    link = '';
    linkPart = '';
    //@Validate(phone, 'Введите корректный номер телефона')
    phonePart = '';
    //@Validate(email, 'Введите корректный Email')
    mailPart = '';
    cities: ICity[] = [];
    groups: IGroups[] = [];
    currencies: ICurrency[] = [];
    managers: IManager[] = [];
    creation = false;
    active = '1';
    activeList = [
        {id: '0', name: 'Не активна'},
        {id: '1', name: 'Активна'}
    ]
    salonId = 0;

    getFormData(): SalonCreateRequestType {
        return {
            active: this.active == '1' ? true : false,
            salon_name: this.name,
            address: this.actualAddr,
            partner: {
                name: this.partner,
                phone: this.phonePart,
                email: this.mailPart,
                social_network: this.linkPart,
            },
            social_network_link: this.link,
            opening_date: this.openingDate,
            INN: this.inn,
            KPP: this.kpp,
            RCBIC: this.bik,
            bank_name: this.bank,
            correspondent_account: this.corr,
            checking_account: this.checkingAcc,
            salon_group_id: this.group,
            city_id: this.city,
            legal_entity_name: this.entity,
            legal_address: this.legalAddr,
            conclusion_contract_date: this.dateDoc,
            currency_id: this.currency,
            escort_manager_id: this.manager,
        }
    }

    setFormData(cities: ICity[], groups: IGroups[], managers: IManager[], currencies: ICurrency[]): void {
        for (let i = 0; i < cities.length; i++) {
            this.cities.push(cities[i]);
        }
        for (let i = 0; i < groups.length; i++) {
            this.groups.push(groups[i]);
        }
        for (let i = 0; i < managers.length; i++) {
            this.managers.push(managers[i]);
        }
        for (let i = 0; i < currencies.length; i++) {
            this.currencies.push(currencies[i]);
        }
    }
}