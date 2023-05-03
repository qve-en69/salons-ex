import Vue, { ComponentOptions } from 'vue';
import { ValidationRule } from 'vuelidate/lib/validators';

/**
 * @Component
 * class TestRequest extends Request {
 *
 *     @Validate({ required }, 'Поле обязательно')
 *     @Validate(
 *         {
 *             isThree: function (this: TestRequest) {
 *                 return this.field === '3';
 *             },
 *         },
 *         'Поле дожно быть равным трем'
 *      )
 *      field = '';
 *
 * }
 */
export declare function Validate(
    rules:
        | ValidationRule
        | (() => ValidationRule)
        | ((self: any) => () => ValidationRule | null)
        | ((self: any) => boolean),
    message: string | any
): PropertyDecorator;

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        validationMessage?: { [key: string]: { [key: string]: string } };
    }
}
