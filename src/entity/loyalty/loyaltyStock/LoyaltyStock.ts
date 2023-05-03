import {
    ILoyaltyStock,
    ILoyaltyStockListItem,
    LoyaltyStockResponseType
} from '@/entity/loyalty/loyaltyStock/LoyaltyStock.types';

export default class LoyaltyStock implements ILoyaltyStock {
    total: number;
    data: ILoyaltyStockListItem[] = [];
    constructor(data: LoyaltyStockResponseType) {
        this.total = data.total;
        for (let i = 0; i < data.data.length; i++) {
            this.data.push(data.data[i]);
        }
    }
}
