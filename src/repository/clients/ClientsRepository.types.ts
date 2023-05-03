import { IClients, IClientsListItem } from '@/entity/clients/clients.types';
import { ClientGeneralRequestType } from '@/form/clientGeneral/clientGeneral.types';
import { PaginationRequestType } from '@/entity/common/pagination.types';
import { ResponseDataType } from '@/form/form.types';

export interface IClientsRepository {
    fetchAll(data?: FormData): Promise<IClients>;
    fetchData(data: PaginationRequestType): Promise<IClientsListItem>;
    create(data: ClientGeneralRequestType): Promise<boolean>;
    update(data: ClientGeneralRequestType): Promise<ResponseDataType>;
    delete(data: { id: number }): Promise<ResponseDataType>;
}
