import { ILoyaltyBonusType, ILoyaltyBonusTypeListItem } from '@/entity/loyalty/loyaltyBonus/loyaltyBonusType/LoyaltyBonusType.types';
import { LoyaltyBonusTypeGeneralRequestType } from '@/form/loyalty/loyaltyBonusType/LoyaltyBonusTypeGeneral.types';
import { PaginationRequestType } from '@/entity/common/pagination.types';
import { ResponseDataType } from '@/form/form.types';

export interface ILoyaltyBonusTypeRepository {
    fetchAll(data?: FormData): Promise<ILoyaltyBonusType>;
    fetchData(data: PaginationRequestType): Promise<ILoyaltyBonusTypeListItem>;
    create(data: LoyaltyBonusTypeGeneralRequestType): Promise<ResponseDataType>;
    update(data: LoyaltyBonusTypeGeneralRequestType): Promise<ResponseDataType>;
    delete(data: { id: number }): Promise<ResponseDataType>;
}
