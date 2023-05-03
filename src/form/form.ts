import { IForm, RequestType } from '@/form/form.types';
import { Vue } from 'vue-property-decorator';
import {message} from "ant-design-vue";

export abstract class Form extends Vue implements IForm {
    public sendingRequest = false;
    status = 0;

    serverErrors: { [property: string]: string[] } = {};

    setErrors(propertyPath: string, title: string): void {
        this.$set(this.serverErrors, propertyPath, [title]);
    }

    getErrors(property: string): string[] {
        return this.serverErrors[property] ?? [];
    }

    getServerError(): Record<string, any> {
        return this.serverErrors;
    }

    clearErrors(property: string): void {
        Vue.delete(this.serverErrors, property);
        console.log(Object.keys(this.getServerError()).length);
        //this.serverErrors = {};
        this.status = 0;
    }

    getFormData(): RequestType {
        return {};
    }

    get disabled(): boolean {
        return this.$v.$invalid || this.sendingRequest || Object.keys(this.getServerError()).length > 0;
    }

    private startRequest(): void {
        this.sendingRequest = true;
    }

    private stopRequest(): void {
        this.sendingRequest = false;
    }

    getMessages(field: string): { [key: string]: string } {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const messages = this.$options.__messages[field];

        const result: { [key: string]: string } = {};
        for (const validator in messages) {
            // eslint-disable-next-line no-prototype-builtins
            if (messages.hasOwnProperty(validator)) {
                result[validator] =
                    typeof messages[validator] === 'function' ? messages[validator](this) : messages[validator];
            }
        }

        return result;
    }


    async submit(callback: CallableFunction, route?: string): Promise<boolean> {
        try {
            this.startRequest();
            let res = null
            if (route) {
                res = await callback({data: this.getFormData(), route: route});
            } else res = await callback(this.getFormData());
            if (res.status) {
                this.showSuccess(res.response);
            } else this.showError(res.response);
            return res.status;
        } catch (e) {
            console.log(e);
            return false;
        } finally {
            this.stopRequest();
        }
    }
    showError(error: string): void{
        message.error(error);
    }
    showSuccess(text: string): void{
        message.success(text);
    }
}
