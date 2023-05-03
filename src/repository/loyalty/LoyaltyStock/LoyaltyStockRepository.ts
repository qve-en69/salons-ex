import { ILoyaltyStockRepository } from '@/repository/loyalty/LoyaltyStock/LoyaltyStockRepository.types';
import {
    ILoyaltyStock,
    ILoyaltyStockListItem,
    LoyaltyStockResponseType
} from '@/entity/loyalty/loyaltyStock/LoyaltyStock.types';
import Api from '@/repository/api';
import LoyaltyStock from '@/entity/loyalty/loyaltyStock/LoyaltyStock';

import { LoyaltyStockGeneralRequestType } from '@/form/loyalty/loyaltyStock/LoyaltyStockGeneral.types';
import qs from 'qs';
import { PaginationRequestType } from '@/entity/common/pagination.types';
import { ResponseDataType } from '@/form/form.types';

export class LoyaltyStockRepository implements ILoyaltyStockRepository {
    async fetchAll(data?: FormData): Promise<ILoyaltyStock> {
        const response = await Api.get(`/promotions/get`, {
            params: data,
            paramsSerializer: function paramsSerializer(params) {
                return new URLSearchParams(params).toString();
            }
        });
        const responseData = response.data as LoyaltyStockResponseType;
        return new LoyaltyStock(responseData);
    }
    async fetchData(data: PaginationRequestType): Promise<ILoyaltyStockListItem> {
        const response = await Api.get(`/promotions/get`, {
            params: data,
            paramsSerializer: function paramsSerializer(params) {
                return qs.stringify(params, { arrayFormat: 'repeat' });
            }
        });
        const responseData = response.data as LoyaltyStockResponseType;
        return new LoyaltyStock(responseData).data[0];
    }
    async create(data: LoyaltyStockGeneralRequestType): Promise<ResponseDataType> {
        const response = await Api.post(`/promotions/create`, data);
        const responseData = response.data;
        return responseData;
    }
    async update(data: LoyaltyStockGeneralRequestType): Promise<ResponseDataType> {
        const response = await Api.post(`/promotions/update`, data);
        const responseData = response.data;
        return responseData;
    }
    async delete(data: { id: number }): Promise<ResponseDataType> {
        const response = await Api.post(`/promotions/delete`, data);
        const responseData = response.data;
        return responseData;
    }
}
