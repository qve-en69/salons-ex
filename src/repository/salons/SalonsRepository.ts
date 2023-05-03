import {ISalonsRepository} from "@/repository/salons/SalonsRepository.types";
import {ISalons, ISalonsListItem, SalonsListItemResponseType, SalonsResponseType} from "@/entity/salons/salons.types";
import Api from "@/repository/api";
import Salons from "@/entity/salons/salons";
import {SalonGeneralRequestType} from "@/form/salonGeneral/salonGeneral.types";
import qs from "qs";
import {PaginationRequestType} from "@/entity/common/pagination.types";
import {ResponseDataType} from "@/form/form.types";

export class SalonsRepository implements ISalonsRepository {
    async fetchAll(data?: FormData): Promise<ISalons> {
        const response = await Api.get(`/salons/get`, {params: data, paramsSerializer: function paramsSerializer(params) {
            return new URLSearchParams(params).toString()
        }});
        const responseData = response.data as SalonsResponseType;
        return new Salons(responseData);
    }
    async fetchData(data: PaginationRequestType): Promise<ISalonsListItem> {
        const response = await Api.get(`/salons/get`, {params: data, paramsSerializer: function paramsSerializer(params) {
                return qs.stringify(params, {arrayFormat: 'repeat'})
            }});
        const responseData = response.data as SalonsResponseType;
        return new Salons(responseData).data[0];
    }
    async create(data: SalonGeneralRequestType): Promise<ResponseDataType> {
        const response = await Api.post(`/salons/create`, data);
        const responseData = response.data;
        return responseData;
    }
    async update(data: SalonGeneralRequestType): Promise<ResponseDataType> {
        const response = await Api.post(`/salons/update`, data);
        const responseData = response.data;
        return responseData;
    }
    async delete(data: { id: number }): Promise<ResponseDataType> {
        const response = await Api.post(`/salons/delete`, data);
        const responseData = response.data;
        return responseData;
    }
}
