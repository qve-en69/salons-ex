import { ILoyaltySubscriptionTypeRepository } from '@/repository/loyalty/LoyaltySubscription/LoyaltySubscriptionType/LoyaltySubscriptionTypeRepository.types';
import {
    ILoyaltySubscriptionType,
    ILoyaltySubscriptionTypeListItem,
    LoyaltySubscriptionTypeResponseType
} from '@/entity/loyalty/loyaltySubscription/loyaltySubscriptionType/LoyaltySubscriptionType.types';
import Api from '@/repository/api';
import LoyaltySubscriptionType from '@/entity/loyalty/loyaltySubscription/loyaltySubscriptionType/LoyaltySubscriptionType';
import { LoyaltySubscriptionTypeGeneralRequestType } from '@/form/loyalty/loyaltySubscriptionType/LoyaltySubscriptionTypeGeneral.types';
import qs from 'qs';
import { PaginationRequestType } from '@/entity/common/pagination.types';
import { ResponseDataType } from '@/form/form.types';

export class LoyaltySubscriptionTypeRepository implements ILoyaltySubscriptionTypeRepository {
    async fetchAll(data?: FormData): Promise<ILoyaltySubscriptionType> {
        const response = await Api.get(`/membership/type/get`, {
            params: data,
            paramsSerializer: function paramsSerializer(params) {
                return new URLSearchParams(params).toString();
            }
        });
        const responseData = response.data as LoyaltySubscriptionTypeResponseType;
        return new LoyaltySubscriptionType(responseData);
    }
    async fetchData(data: PaginationRequestType): Promise<ILoyaltySubscriptionTypeListItem> {
        const response = await Api.get(`/membership/type/get`, {
            params: data,
            paramsSerializer: function paramsSerializer(params) {
                return qs.stringify(params, { arrayFormat: 'repeat' });
            }
        });
        const responseData = response.data as LoyaltySubscriptionTypeResponseType;
        return new LoyaltySubscriptionType(responseData).data[0];
    }
    async create(data: LoyaltySubscriptionTypeGeneralRequestType): Promise<ResponseDataType> {
        const response = await Api.post(`/membership/type/create`, data);
        const responseData = response.data;
        return responseData;
    }
    async update(data: LoyaltySubscriptionTypeGeneralRequestType): Promise<ResponseDataType> {
        const response = await Api.post(`/membership/type/update`, data);
        const responseData = response.data;
        return responseData;
    }
    async delete(data: { id: number }): Promise<ResponseDataType> {
        const response = await Api.post(`/membership/type/delete`, data);
        const responseData = response.data;
        return responseData;
    }
}
