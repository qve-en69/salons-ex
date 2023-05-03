import {
    ILoyaltyCertType,
    ILoyaltyCertTypeListItem,
    LoyaltyCertTypeResponseType
} from '@/entity/loyalty/loyaltyCert/loyaltyCertType/LoyaltyCertType.types';

export default class LoyaltyCertType implements ILoyaltyCertType {
    total: number;
    data: ILoyaltyCertTypeListItem[] = [];
    constructor(data: LoyaltyCertTypeResponseType) {
        this.total = data.total;
        for (let i = 0; i < data.data.length; i++) {
            this.data.push(data.data[i]);
        }
    }
}
