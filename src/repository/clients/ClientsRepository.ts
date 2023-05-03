import { IClientsRepository } from '@/repository/clients/ClientsRepository.types';
import {
    IClients,
    IClientsListItem,
    ClientsResponseType
} from '@/entity/clients/clients.types';

import Api from '@/repository/api';
import Clients from '@/entity/clients/clients';
import { ClientGeneralRequestType } from '@/form/clientGeneral/clientGeneral.types';
import qs from 'qs';
import { PaginationRequestType } from '@/entity/common/pagination.types';
import { ResponseDataType } from '@/form/form.types';


export class ClientsRepository implements IClientsRepository {
    async fetchAll(data?: FormData): Promise<IClients> {
        const response = await Api.get(`/clients/get`, {
            params: data,
            paramsSerializer: function paramsSerializer(params) {
                return new URLSearchParams(params).toString();
            }
        });
        
        const responseData = response.data as ClientsResponseType;
        return new Clients(responseData);
    }
    async fetchData(data: PaginationRequestType): Promise<IClientsListItem> {
        console.log('Client query - ')
        const response = await Api.get(`/clients/get`, {
            params: data,
            paramsSerializer: function paramsSerializer(params) {
                console.log('Client params - '+ params)
                return qs.stringify(params, { arrayFormat: 'repeat' });
            }
        });
        //const responseData = response.data as ClientsResponseType;
        const responseData = response.data as ClientsResponseType;
        //return new Clients(responseData)

        return new Clients(responseData).data[0];
    }
    async create(data: ClientGeneralRequestType): Promise<boolean> {
        const response = await Api.post(`/clients/create`, data);
        const responseData = response.data;
        return responseData;
    }
    async update(data: ClientGeneralRequestType): Promise<ResponseDataType> {
        const response = await Api.post(`/clients/update`, data);
        const responseData = response.data;
        return responseData;
    }
    async delete(data: { id: number }): Promise<ResponseDataType> {
        const response = await Api.post(`/clients/delete`, data);
        const responseData = response.data;
        return responseData;
    }
}
