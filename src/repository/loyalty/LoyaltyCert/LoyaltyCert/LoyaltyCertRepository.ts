import { ILoyaltyCertRepository } from '@/repository/loyalty/LoyaltyCert/LoyaltyCert/LoyaltyCertRepository.types';
import {
    ILoyaltyCert,
    ILoyaltyCertListItem,
    LoyaltyCertResponseType
} from '@/entity/loyalty/loyaltyCert/loyaltyCert/loyaltyCert.types';
import Api from '@/repository/api';
import LoyaltyCert from '@/entity/loyalty/loyaltyCert/loyaltyCert/loyaltyCert';

import { LoyaltyCertGeneralRequestType } from '@/form/loyalty/loyaltyCert/LoyaltyCertGeneral.types';
import qs from 'qs';
import { PaginationRequestType } from '@/entity/common/pagination.types';
import { ResponseDataType } from '@/form/form.types';

export class LoyaltyCertRepository implements ILoyaltyCertRepository {
    async fetchAll(data?: FormData): Promise<ILoyaltyCert> {
        const response = await Api.get(`/certificate/get`, {
            params: data,
            paramsSerializer: function paramsSerializer(params) {
                return new URLSearchParams(params).toString();
            }
        });
        const responseData = response.data as LoyaltyCertResponseType;
        return new LoyaltyCert(responseData);
    }
    async fetchData(data: PaginationRequestType): Promise<ILoyaltyCertListItem> {
        const response = await Api.get(`/certificate/get`, {
            params: data,
            paramsSerializer: function paramsSerializer(params) {
                return qs.stringify(params, { arrayFormat: 'repeat' });
            }
        });
        const responseData = response.data as LoyaltyCertResponseType;
        return new LoyaltyCert(responseData).data[0];
    }
    async create(data: LoyaltyCertGeneralRequestType): Promise<ResponseDataType> {
        const response = await Api.post(`/certificate/create`, data);
        const responseData = response.data;
        return responseData;
    }
    async update(data: LoyaltyCertGeneralRequestType): Promise<ResponseDataType> {
        const response = await Api.post(`/certificate/update`, data);
        const responseData = response.data;
        return responseData;
    }
    async delete(data: { id: number }): Promise<ResponseDataType> {
        const response = await Api.post(`/certificate/delete`, data);
        const responseData = response.data;
        return responseData;
    }
}
