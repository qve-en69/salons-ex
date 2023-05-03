import {
    ILoyaltyBonus,
    ILoyaltyBonusListItem,
    LoyaltyBonusResponseType
} from '@/entity/loyalty/loyaltyBonus/loyaltyBonus/LoyaltyBonus.types';

export default class LoyaltyBonus implements ILoyaltyBonus {
    total: number;
    data: ILoyaltyBonusListItem[] = [];
    constructor(data: LoyaltyBonusResponseType) {
        this.total = data.total;
        for (let i = 0; i < data.data.length; i++) {
            this.data.push(data.data[i]);
        }
    }
}
