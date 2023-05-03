import {
    ILoyaltySubscriptionType,
    ILoyaltySubscriptionTypeListItem,
    LoyaltySubscriptionTypeResponseType
} from '@/entity/loyalty/loyaltySubscription/loyaltySubscriptionType/LoyaltySubscriptionType.types';

export default class LoyaltySubscriptionType implements ILoyaltySubscriptionType {
    total: number;
    data: ILoyaltySubscriptionTypeListItem[] = [];
    constructor(data: LoyaltySubscriptionTypeResponseType) {
        this.total = data.total;
        for (let i = 0; i < data.data.length; i++) {
            this.data.push(data.data[i]);
        }
    }
}
