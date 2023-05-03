import { ILoyaltySubscription, ILoyaltySubscriptionListItem } from '@/entity/loyalty/loyaltySubscription/loyaltySubscription/LoyaltySubscription.types';
import { LoyaltySubscriptionGeneralRequestType } from '@/form/loyalty/loyaltySubscription/LoyaltySubscriptionGeneral.types';
import { PaginationRequestType } from '@/entity/common/pagination.types';
import { ResponseDataType } from '@/form/form.types';

export interface ILoyaltySubscriptionRepository {
    fetchAll(data?: FormData): Promise<ILoyaltySubscription>;
    fetchData(data: PaginationRequestType): Promise<ILoyaltySubscriptionListItem>;
    create(data: LoyaltySubscriptionGeneralRequestType): Promise<ResponseDataType>;
    update(data: LoyaltySubscriptionGeneralRequestType): Promise<ResponseDataType>;
    delete(data: { id: number }): Promise<ResponseDataType>;
}
