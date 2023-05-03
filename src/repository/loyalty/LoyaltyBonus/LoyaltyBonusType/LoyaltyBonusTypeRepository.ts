import { ILoyaltyBonusTypeRepository } from '@/repository/loyalty/LoyaltyBonus/LoyaltyBonusType/LoyaltyBonusTypeRepository.types';
import {
    ILoyaltyBonusType,
    ILoyaltyBonusTypeListItem,
    LoyaltyBonusTypeResponseType
} from '@/entity/loyalty/loyaltyBonus/loyaltyBonusType/LoyaltyBonusType.types';
import Api from '@/repository/api';
import LoyaltyBonusType from '@/entity/loyalty/loyaltyBonus/loyaltyBonusType/LoyaltyBonusType';
import { LoyaltyBonusTypeGeneralRequestType } from '@/form/loyalty/loyaltyBonusType/LoyaltyBonusTypeGeneral.types';
import qs from 'qs';
import { PaginationRequestType } from '@/entity/common/pagination.types';
import { ResponseDataType } from '@/form/form.types';

export class LoyaltyBonusTypeRepository implements ILoyaltyBonusTypeRepository {
    async fetchAll(data?: FormData): Promise<ILoyaltyBonusType> {
        const response = await Api.get(`/bonus_programm/type/get`, {
            params: data,
            paramsSerializer: function paramsSerializer(params) {
                return new URLSearchParams(params).toString();
            }
        });
        const responseData = response.data as LoyaltyBonusTypeResponseType;
        return new LoyaltyBonusType(responseData);
    }
    async fetchData(data: PaginationRequestType): Promise<ILoyaltyBonusTypeListItem> {
        const response = await Api.get(`/bonus_programm/type/get`, {
            params: data,
            paramsSerializer: function paramsSerializer(params) {
                return qs.stringify(params, { arrayFormat: 'repeat' });
            }
        });
        const responseData = response.data as LoyaltyBonusTypeResponseType;
        return new LoyaltyBonusType(responseData).data[0];
    }
    async create(data: LoyaltyBonusTypeGeneralRequestType): Promise<ResponseDataType> {
        const response = await Api.post(`/bonus_programm/type/create`, data);
        const responseData = response.data;
        return responseData;
    }
    async update(data: LoyaltyBonusTypeGeneralRequestType): Promise<ResponseDataType> {
        const response = await Api.post(`/bonus_programm/type/update`, data);
        const responseData = response.data;
        return responseData;
    }
    async delete(data: { id: number }): Promise<ResponseDataType> {
        const response = await Api.post(`/bonus_programm/type/delete`, data);
        const responseData = response.data;
        return responseData;
    }
}
