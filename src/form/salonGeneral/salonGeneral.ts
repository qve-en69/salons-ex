import {Form} from "@/form/form";
import {Validate} from "@/plugins/Vuelidate/Decorators";
import {maxLength, minLength, numeric, required} from "vuelidate/lib/validators";
import {Component} from "vue-property-decorator";
import {SalonGeneralRequestType} from "@/form/salonGeneral/salonGeneral.types";
import {ICity} from "@/entity/territory/territory.types";
import {ISalonsListItem} from "@/entity/salons/salons.types";
import {IGroups} from "@/entity/groups/groups.types";
import {ICurrency} from "@/entity/currency/currency.types";
import {IManager} from "@/entity/manager/manager.types";
import {fio, email, phone} from "@/utils/validators";

@Component
export default class SalonGeneralForm extends Form {
    @Validate(required, 'Введите неаименование студии')
    name = '';
    @Validate(required, 'Введите город')
    city: number | null = null;
    @Validate(required, 'Введите название юр. лица')
    entity = '';
    @Validate(required, 'Введите юр. адрес')
    legalAddr = '';
    @Validate(required, 'Введите фактический адрес')
    actualAddr = '';
    @Validate(required, 'Введите ИНН')
    inn = '';
    @Validate(required, 'Введите КПП')
    kpp = '';
    @Validate(required, 'Введите БИК')
    bik = '';
    @Validate(required, 'Введите название банка')
    bank = '';
    @Validate(required, 'Введите корр. счет')
    corr = '';
    @Validate(required, 'Введите расчетный счет')
    checkingAcc = '';
    @Validate(required, 'Введите дату заключения договора')
    conclusion_contract_date: any;
    @Validate(required, 'Введите менеджера сопровождения')
    manager: number | null = null;
    @Validate(required, 'Введите группу')
    group: number | null = null;
    @Validate(required, 'Введите валюту')
    currency: number | null = null;
    @Validate(required, 'Введите дату открытия')
    opening_date: any;
    @Validate(fio, 'Введите корректное ФИО')
    partner = '';
    link = '';
    linkPart = '';

    @Validate(required, 'Введите корректный номер телефона')
    @Validate(maxLength(18), 'укажите правильный телефон')
    @Validate(minLength(18), 'укажите правильный телефон')
    phonePart = '';

    @Validate(email, 'Введите корректный Email')
    mailPart = '';
    cities: ICity[] = [];
    groups: IGroups[] = [];
    currencies: ICurrency[] = [];
    managers: IManager[] = [];
    active = '1';
    activeList = [
        {id: '0', name: 'Не активна'},
        {id: '1', name: 'Активна'}
    ]
    salonId = 0;
    partnerId: number | null = null;
    legalEntityId: number | null = null;
    accountId: number | null = null;

    getFormData(): SalonGeneralRequestType {
        return {
            id: this.salonId,
            active: this.active == '1' ? true : false,
            name: this.name,
            address: this.actualAddr,
            partner: {
                id: this.partnerId!,
                name: this.partner,
                phone: this.phonePart,
                email: this.mailPart,
                social_network: this.linkPart,
            },
            social_network_link: this.link,
            opening_date: this.opening_date,
            salon_group_id: this.group,
            city_id: this.city,
            conclusion_contract_date: this.conclusion_contract_date,
            currency_id: this.currency,
            escort_manager_id: this.manager,
            legal_entity_data: {
                id: this.legalEntityId!,
                name: this.entity,
                legal_address: this.legalAddr,
                actual_address: this.actualAddr,
                INN: +this.inn,
                KPP: +this.kpp,
                account: {
                    id: this.accountId!,
                    RCBIC: +this.bik,
                    bank_name: this.bank,
                    correspondent_account: +this.corr,
                    checking_account: +this.checkingAcc
                }
            }
        }
    }

    setFormData(cities: ICity[], groups: IGroups[], managers: IManager[], currencies: ICurrency[], salon: ISalonsListItem): void {
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
        if (salon !== undefined) {
            this.name = salon.name;
            this.city = salon.city.id;
            this.entity = salon.legal_entity_data.name;
            this.legalAddr = salon.legal_entity_data.legal_address;
            this.actualAddr = salon.address;

            //Todo:: приходит пустой legal_entity_data.INN
            if (salon.legal_entity_data.INN) {
                this.inn = salon.legal_entity_data.INN.toString();
            }
            //Todo:: приходит пустой legal_entity_data.Kpp
            if (salon.legal_entity_data.KPP) {
                this.kpp = salon.legal_entity_data.KPP.toString();
            }
            //Todo:: приходит пустой legal_entity_data.Kpp
            if (salon.legal_entity_data.account.RCBIC) {
                this.bik = salon.legal_entity_data.account.RCBIC.toString();
            }
            this.bank = salon.legal_entity_data.account.bank_name;

            if (salon.legal_entity_data.account.correspondent_account) {
                this.corr = salon.legal_entity_data.account.correspondent_account.toString();
            }
            if (salon.legal_entity_data.account.checking_account) {
                this.checkingAcc = salon.legal_entity_data.account.checking_account.toString();
            }
            this.opening_date = salon.opening_date;//new Date(salon.opening_date).toLocaleDateString();
            this.conclusion_contract_date = salon.conclusion_contract_date;//new Date(salon.conclusion_contract_date).toLocaleDateString();
            this.group = salon.group.id;
            this.partner = salon.partner.name;
            this.link = salon.social_network_link;
            this.linkPart = salon.partner.social_network;

            if (salon.partner.phone) {
                this.phonePart = salon.partner.phone.toString();
            }

            this.mailPart = salon.partner.email;
            this.manager = salon.manager.id;
            this.currency = salon.currency_id;
            this.entity = salon.legal_entity_data.name;
            this.active = salon.active ? '1' : '0';
            this.partnerId = salon.partner.id;
            this.accountId = salon.legal_entity_data.account.id;
            this.salonId = salon.id;
            this.legalEntityId = salon.legal_entity;
        }
    }
    
}
