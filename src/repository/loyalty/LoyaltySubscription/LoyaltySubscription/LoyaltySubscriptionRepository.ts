import { ILoyaltySubscriptionRepository } from '@/repository/loyalty/LoyaltySubscription/LoyaltySubscription/LoyaltySubscriptionRepository.types';
import {
    ILoyaltySubscription,
    ILoyaltySubscriptionListItem,
    LoyaltySubscriptionResponseType
} from '@/entity/loyalty/loyaltySubscription/loyaltySubscription/LoyaltySubscription.types';
import Api from '@/repository/api';
import LoyaltySubscription from '@/entity/loyalty/loyaltySubscription/loyaltySubscription/LoyaltySubscription';
import { LoyaltySubscriptionGeneralRequestType } from '@/form/loyalty/loyaltySubscription/LoyaltySubscriptionGeneral.types';
import qs from 'qs';
import { PaginationRequestType } from '@/entity/common/pagination.types';
import { ResponseDataType } from '@/form/form.types';

export class LoyaltySubscriptionRepository implements ILoyaltySubscriptionRepository {
    async fetchAll(data?: FormData): Promise<ILoyaltySubscription> {
        const response = await Api.get(`/membership/get`, {
            params: data,
            paramsSerializer: function paramsSerializer(params) {
                return new URLSearchParams(params).toString();
            }
        });
        const responseData = response.data as LoyaltySubscriptionResponseType;
        return new LoyaltySubscription(responseData);
    }
    async fetchData(data: PaginationRequestType): Promise<ILoyaltySubscriptionListItem> {
        const response = await Api.get(`/membership/get`, {
            params: data,
            paramsSerializer: function paramsSerializer(params) {
                return qs.stringify(params, { arrayFormat: 'repeat' });
            }
        });
        const responseData = response.data as LoyaltySubscriptionResponseType;
        return new LoyaltySubscription(responseData).data[0];
    }
    async create(data: LoyaltySubscriptionGeneralRequestType): Promise<ResponseDataType> {
        const response = await Api.post(`/membership/create`, data);
        const responseData = response.data;
        return responseData;
    }
    async update(data: LoyaltySubscriptionGeneralRequestType): Promise<ResponseDataType> {
        const response = await Api.post(`/membership/update`, data);
        const responseData = response.data;
        return responseData;
    }
    async delete(data: { id: number }): Promise<ResponseDataType> {
        const response = await Api.post(`/membership/delete`, data);
        const responseData = response.data;
        return responseData;
    }
}
