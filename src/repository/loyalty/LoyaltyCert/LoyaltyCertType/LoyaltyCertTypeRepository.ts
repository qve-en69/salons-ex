import { ILoyaltyCertTypeRepository } from '@/repository/loyalty/LoyaltyCert/LoyaltyCertType/LoyaltyCertTypeRepository.types';
import {
    ILoyaltyCertType,
    ILoyaltyCertTypeListItem,
    LoyaltyCertTypeResponseType
} from '@/entity/loyalty/loyaltyCert/loyaltyCertType/LoyaltyCertType.types';
import Api from '@/repository/api';
import LoyaltyCertType from '@/entity/loyalty/loyaltyCert/loyaltyCertType/LoyaltyCertType';
import { LoyaltyCertTypeGeneralRequestType } from '@/form/loyalty/loyaltyCertType/LoyaltyCertTypeGeneral.types';
import { LoyaltyCertTypeAddFormRequestType } from '@/form/loyalty/loyaltyCertType/LoyaltyCertTypeAddForm.types';
import qs from 'qs';
import { PaginationRequestType } from '@/entity/common/pagination.types';
import { ResponseDataType } from '@/form/form.types';

export class LoyaltyCertTypeRepository implements ILoyaltyCertTypeRepository {
    async fetchAll(data?: FormData): Promise<ILoyaltyCertType> {
        const response = await Api.get(`/certificate/type/get`, {
            params: data,
            paramsSerializer: function paramsSerializer(params) {
                return new URLSearchParams(params).toString();
            }
        });
        const responseData = response.data as LoyaltyCertTypeResponseType;
        return new LoyaltyCertType(responseData);
    }
    async fetchData(data: PaginationRequestType): Promise<ILoyaltyCertTypeListItem> {
        const response = await Api.get(`/certificate/type/get`, {
            params: data,
            paramsSerializer: function paramsSerializer(params) {
                return qs.stringify(params, { arrayFormat: 'repeat' });
            }
        });
        const responseData = response.data as LoyaltyCertTypeResponseType;
        return new LoyaltyCertType(responseData).data[0];
    }
    async create(data: LoyaltyCertTypeAddFormRequestType): Promise<ResponseDataType> {
        const response = await Api.post(`/certificate/type/create`, data);
        const responseData = response.data;
        return responseData;
    }
    async update(data: LoyaltyCertTypeGeneralRequestType): Promise<ResponseDataType> {
        const response = await Api.post(`/certificate/type/update`, data);
        const responseData = response.data;
        return responseData;
    }
    async delete(data: { id: number }): Promise<ResponseDataType> {
        const response = await Api.post(`/certificate/type/delete`, data);
        const responseData = response.data;
        return responseData;
    }
}
