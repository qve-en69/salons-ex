import {Form} from "@/form/form";
import {LoginRequestType} from "@/form/login/login.types";
import {Validate} from "@/plugins/Vuelidate/Decorators";
import {required} from "vuelidate/lib/validators";
import {Component} from "vue-property-decorator";

@Component
export default class LoginForm extends Form{
    @Validate(required, 'Введите телефон')
    phone = '';
    @Validate(required, 'Введите пароль')
    password = '';
    getFormData(): LoginRequestType {
        return {
            phone: this.phone,
            password: this.password
        }
    }
}