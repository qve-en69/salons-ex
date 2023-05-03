import {
    ILoyaltyBonusType,
    ILoyaltyBonusTypeListItem,
    LoyaltyBonusTypeResponseType
} from '@/entity/loyalty/loyaltyBonus/loyaltyBonusType/LoyaltyBonusType.types';

export default class LoyaltyBonusType implements ILoyaltyBonusType {
    total: number;
    data: ILoyaltyBonusTypeListItem[] = [];
    constructor(data: LoyaltyBonusTypeResponseType) {
        this.total = data.total;
        for (let i = 0; i < data.data.length; i++) {
            this.data.push(data.data[i]);
        }
    }
}
