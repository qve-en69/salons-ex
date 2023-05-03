import { ILoyaltyCertTypeForm, LoyaltyCertTypeResponseTypeForm } from '@/entity/loyaltyCertTypeForm/loyaltyCertTypeForm.types';

export default class LoyaltyCertType implements ILoyaltyCertTypeForm {
    id: number;
    name: string;
    constructor(data: LoyaltyCertTypeResponseTypeForm) {
        this.id = data.id;
        this.name = data.name;
    }
}
