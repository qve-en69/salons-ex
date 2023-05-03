import { ILoyaltyStock, ILoyaltyStockListItem } from '@/entity/loyalty/loyaltyStock/LoyaltyStock.types';
import { LoyaltyStockGeneralRequestType } from '@/form/loyalty/loyaltyStock/LoyaltyStockGeneral.types';
import { PaginationRequestType } from '@/entity/common/pagination.types';
import { ResponseDataType } from '@/form/form.types';

export interface ILoyaltyStockRepository {
    fetchAll(data?: FormData): Promise<ILoyaltyStock>;
    fetchData(data: PaginationRequestType): Promise<ILoyaltyStockListItem>;
    create(data: LoyaltyStockGeneralRequestType): Promise<ResponseDataType>;
    update(data: LoyaltyStockGeneralRequestType): Promise<ResponseDataType>;
    delete(data: { id: number }): Promise<ResponseDataType>;
}
