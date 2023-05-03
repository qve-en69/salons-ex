import {
    ILoyaltyCert,
    ILoyaltyCertListItem,
    LoyaltyCertResponseType
} from '@/entity/loyalty/loyaltyCert/loyaltyCert/loyaltyCert.types';

export default class LoyaltyCert implements ILoyaltyCert {
    total: number;
    data: ILoyaltyCertListItem[] = [];
    constructor(data: LoyaltyCertResponseType) {
        this.total = data.total;
        for (let i = 0; i < data.data.length; i++) {
            this.data.push(data.data[i]);
        }
    }
}
