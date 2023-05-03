import {helpers} from 'vuelidate/lib/validators';

export const less = (less: any): any =>
    helpers.withParams({ type: 'less', param: less }, function(value: any, parentVm: any) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return +value <= +helpers.ref(less, this, parentVm);
    })
export const fio = (): any =>
    helpers.withParams({ type: 'fio'}, function(value: any, parentVm: any) {
        const regExp = /^([А-ЯA-Z]|[А-ЯA-Z][\x27а-яa-z]{1,}|[А-ЯA-Z][\x27а-яa-z]{1,}\-([А-ЯA-Z][\x27а-яa-z]{1,}|(оглы)|(кызы)))\040[А-ЯA-Z][\x27а-яa-z]{1,}(\040[А-ЯA-Z][\x27а-яa-z]{1,})?$/
        return regExp.test(value)
        /*return value.split(' ').length >= 2;*/
    })
export const email = (): any =>
    helpers.withParams({ type: 'email'}, function(value: any, parentVm: any) {
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)){
            return true;
        }else{
            return false;
        }
    })
export const phone = (): any =>
    helpers.withParams({ type: 'phone'}, function(value: any, parentVm: any) {
        const regex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
        if(regex.test(value)){
            return true;
        }else{
            return false;
        }
    })
export const date = (): any =>
    helpers.withParams({ type: 'date'}, function(value: any, parentVm: any) {
        // First check for the pattern
        console.log(value);
        if(!/^\d{1,2}\.\d{1,2}\.\d{4}$/.test(value))
            return false;

        // Parse the date parts to integers
        const parts = value.split(".");
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);

        // Check the ranges of month and year
        if(year < 1000 || year > 3000 || month == 0 || month > 12)
            return false;

        const monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

        // Adjust for leap years
        if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
            monthLength[1] = 29;

        // Check the range of the day
        return day > 0 && day <= monthLength[month - 1];
    })
