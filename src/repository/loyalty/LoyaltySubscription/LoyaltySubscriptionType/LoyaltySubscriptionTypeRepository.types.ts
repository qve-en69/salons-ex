import { ILoyaltySubscriptionType, ILoyaltySubscriptionTypeListItem } from '@/entity/loyalty/loyaltySubscription/loyaltySubscriptionType/LoyaltySubscriptionType.types';
import { LoyaltySubscriptionTypeGeneralRequestType } from '@/form/loyalty/loyaltySubscriptionType/LoyaltySubscriptionTypeGeneral.types';
import { PaginationRequestType } from '@/entity/common/pagination.types';
import { ResponseDataType } from '@/form/form.types';

export interface ILoyaltySubscriptionTypeRepository {
    fetchAll(data?: FormData): Promise<ILoyaltySubscriptionType>;
    fetchData(data: PaginationRequestType): Promise<ILoyaltySubscriptionTypeListItem>;
    create(data: LoyaltySubscriptionTypeGeneralRequestType): Promise<ResponseDataType>;
    update(data: LoyaltySubscriptionTypeGeneralRequestType): Promise<ResponseDataType>;
    delete(data: { id: number }): Promise<ResponseDataType>;
}
