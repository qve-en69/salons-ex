import { Action, getModule, Module, MutationAction, VuexModule } from 'vuex-module-decorators';
import store from '@/store';
import { IClients, IClientsListItem } from '@/entity/clients/clients.types';
import { PaginationRequestType } from '@/entity/common/pagination.types';
import { ClientGeneralRequestType } from '@/form/clientGeneral/clientGeneral.types';
import { ResponseDataType } from '@/form/form.types';
@Module({
    namespaced: true,
    name: 'clients',
    store,
    dynamic: true
})
class ClientsModule extends VuexModule {
    clients: IClients | null = null;
    client: IClientsListItem | null = null;
    clientLoaded = false;
    clientsLoaded = false;
    @MutationAction
    async fetchAll(data?: PaginationRequestType): Promise<{ clients: IClients; clientsLoaded: boolean }> {
        const formData = new FormData();
        if (data) {
            if (data.skip) {
                formData.append('skip', data.skip.toString());
            } else formData.delete('skip');
            if (data.limit) {
                formData.append('limit', data.limit.toString());
            } else formData.delete('limit');
            if (data.by) {
                formData.append('by', data.by.toString());
            } else formData.delete('by');
            if (data.sort) {
                formData.append('sort', data.sort.toString());
            } else formData.delete('sort');
            if (data.filter) {
                for(const field in data.filter){
                    Object.keys(data.filter).forEach(field => formData.append('filter[' + field + ']', data.filter[field].toString()));
                }
            } else formData.delete('filter');
        }
        let clientsLoaded = false;
        console.log('Client query vuex - ')

        const clients = await store.$repository.clients.fetchAll(formData);
        if (clients) {
            clientsLoaded = true;
        }
        return { clients, clientsLoaded };
    }
    @MutationAction
    async fetchData(data: PaginationRequestType): Promise<{ client: IClientsListItem; clientLoaded: boolean }> {
        console.log('Client query vuex fetch Data - ')
        let clientLoaded = false;
        const client = await store.$repository.clients.fetchData(data);
        if (client) {
            clientLoaded = true;
        }
        return { client, clientLoaded };
    }
    @Action({ rawError: true })
    async create(data: ClientGeneralRequestType): Promise<boolean> {
        const resp = await store.$repository.clients.create(data);
        return resp;
    }
    @Action({ rawError: true })
    async update(data: ClientGeneralRequestType): Promise<ResponseDataType> {
        const resp = await store.$repository.clients.update(data);
        return resp;
    }
    @Action({ rawError: true })
    async delete(data: { id: number }): Promise<ResponseDataType> {
        const resp = await store.$repository.clients.delete(data);
        return resp;
    }
}

export const ClientsStore = getModule(ClientsModule);
