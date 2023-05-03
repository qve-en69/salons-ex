import { ILoyaltyBonusRepository } from '@/repository/loyalty/LoyaltyBonus/LoyaltyBonus/LoyaltyBonusRepository.types';
import {
    ILoyaltyBonus,
    ILoyaltyBonusListItem,
    LoyaltyBonusResponseType
} from '@/entity/loyalty/loyaltyBonus/loyaltyBonus/LoyaltyBonus.types';
import Api from '@/repository/api';
import LoyaltyBonus from '@/entity/loyalty/loyaltyBonus/loyaltyBonus/LoyaltyBonus';
import { LoyaltyBonusGeneralRequestType } from '@/form/loyalty/loyaltyBonus/LoyaltyBonusGeneral.types';
import qs from 'qs';
import { PaginationRequestType } from '@/entity/common/pagination.types';
import { ResponseDataType } from '@/form/form.types';

export class LoyaltyBonusRepository implements ILoyaltyBonusRepository {
    async fetchAll(data?: FormData): Promise<ILoyaltyBonus> {
        const response = await Api.get(`/bonus_programm/get`, {
            params: data,
            paramsSerializer: function paramsSerializer(params) {
                return new URLSearchParams(params).toString();
            }
        });
        const responseData = response.data as LoyaltyBonusResponseType;
        return new LoyaltyBonus(responseData);
    }
    async fetchData(data: PaginationRequestType): Promise<ILoyaltyBonusListItem> {
        const response = await Api.get(`/bonus_programm/get`, {
            params: data,
            paramsSerializer: function paramsSerializer(params) {
                return qs.stringify(params, { arrayFormat: 'repeat' });
            }
        });
        const responseData = response.data as LoyaltyBonusResponseType;
        return new LoyaltyBonus(responseData).data[0];
    }
    async create(data: LoyaltyBonusGeneralRequestType): Promise<ResponseDataType> {
        const response = await Api.post(`/bonus_programm/create`, data);
        const responseData = response.data;
        return responseData;
    }
    async update(data: LoyaltyBonusGeneralRequestType): Promise<ResponseDataType> {
        const response = await Api.post(`/bonus_programm/update`, data);
        const responseData = response.data;
        return responseData;
    }
    async delete(data: { id: number }): Promise<ResponseDataType> {
        const response = await Api.post(`/bonus_programm/delete`, data);
        const responseData = response.data;
        return responseData;
    }
}
