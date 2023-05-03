import { ILoyaltyBonus, ILoyaltyBonusListItem } from '@/entity/loyalty/loyaltyBonus/loyaltyBonus/LoyaltyBonus.types';
import { LoyaltyBonusGeneralRequestType } from '@/form/loyalty/loyaltyBonus/LoyaltyBonusGeneral.types';
import { PaginationRequestType } from '@/entity/common/pagination.types';
import { ResponseDataType } from '@/form/form.types';

export interface ILoyaltyBonusRepository {
    fetchAll(data?: FormData): Promise<ILoyaltyBonus>;
    fetchData(data: PaginationRequestType): Promise<ILoyaltyBonusListItem>;
    create(data: LoyaltyBonusGeneralRequestType): Promise<ResponseDataType>;
    update(data: LoyaltyBonusGeneralRequestType): Promise<ResponseDataType>;
    delete(data: { id: number }): Promise<ResponseDataType>;
}
