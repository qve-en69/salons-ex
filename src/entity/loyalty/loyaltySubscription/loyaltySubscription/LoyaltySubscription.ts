import {
    ILoyaltySubscription,
    ILoyaltySubscriptionListItem,
    LoyaltySubscriptionResponseType
} from '@/entity/loyalty/loyaltySubscription/loyaltySubscription/LoyaltySubscription.types';

export default class LoyaltySubscription implements ILoyaltySubscription {
    total: number;
    data: ILoyaltySubscriptionListItem[] = [];
    constructor(data: LoyaltySubscriptionResponseType) {
        this.total = data.total;
        for (let i = 0; i < data.data.length; i++) {
            this.data.push(data.data[i]);
        }
    }
}
