import { Action, getModule, Module, MutationAction, VuexModule } from 'vuex-module-decorators';
import store from '@/store';
import {
    ILoyaltyCert,
    ILoyaltyCertListItem,
    LoyaltyCertResponseType
} from '@/entity/loyalty/loyaltyCert/loyaltyCert/loyaltyCert.types';
import { PaginationRequestType } from '@/entity/common/pagination.types';
import { LoyaltyCertGeneralRequestType } from '@/form/loyalty/loyaltyCert/LoyaltyCertGeneral.types';
import { ResponseDataType } from '@/form/form.types';
import { createLogger } from 'vuex';

@Module({
    namespaced: true,
    name: 'loyaltyCert',
    store,
    dynamic: true
})
class LoyaltyCertModule extends VuexModule {
    loyaltyCerts: ILoyaltyCert | null = null;
    loyaltyCert: ILoyaltyCertListItem | null = null;
    loyaltyCertLoaded = false;
    @MutationAction
    async fetchAll(data?: PaginationRequestType): Promise<{ loyaltyCerts: ILoyaltyCert; loyaltyCertLoaded: boolean }> {
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
                for (const field in data.filter) {
                    Object.keys(data.filter).forEach(field =>
                        formData.append('filter[' + field + ']', data.filter[field].toString())
                    );
                }
            } else formData.delete('filter');
        }
        let loyaltyCertLoaded = false;
        const loyaltyCerts = await store.$repository.loyaltyCert.fetchAll(formData);

        if (loyaltyCerts) {
            loyaltyCertLoaded = true;
        }
        return { loyaltyCerts, loyaltyCertLoaded };
    }
    @MutationAction
    async fetchData(data: PaginationRequestType): Promise<{ loyaltyCert: ILoyaltyCertListItem; loyaltyCertLoaded: boolean }> {
        let loyaltyCertLoaded = false;
        const loyaltyCert = await store.$repository.loyaltyCert.fetchData(data);
        if (loyaltyCert) {
            loyaltyCertLoaded = true;
        }
        return { loyaltyCert, loyaltyCertLoaded };
    }
    @Action({ rawError: true })
    async create(data: LoyaltyCertGeneralRequestType): Promise<ResponseDataType> {
        const resp = await store.$repository.loyaltyCert.create(data);
        return resp;
    }
    @Action({ rawError: true })
    async update(data: LoyaltyCertGeneralRequestType): Promise<ResponseDataType> {
        const resp = await store.$repository.loyaltyCert.update(data);
        return resp;
    }
    /*@MutationAction
    async fetchData(data: PaginationRequestType): Promise<{ salon: ILoyaltyCertListItem  ; counterpartiesLoaded: boolean }> {
        let counterpartiesLoaded = false;
        const salon = await store.$repository.counterparties.fetchData(data);
        if (salon) {
            counterpartiesLoaded = true;
        }
        return { salon, counterpartiesLoaded};
    }
    @Action({rawError: true})
    async create(data: LoyaltyCertGeneralRequestType): Promise<ResponseDataType> {
        const resp = await store.$repository.counterparties.create(data);
        return resp;
    }
    @Action({rawError: true})
    async update(data: LoyaltyCertGeneralRequestType): Promise<ResponseDataType> {
        const resp = await store.$repository.counterparties.update(data);
        return resp;
    }
    @Action({rawError: true})
    async delete(data: {id: number}): Promise<ResponseDataType> {
        const resp = await store.$repository.counterparties.delete(data);
        return resp;
    }*/
}

export const LoyaltyCertStore = getModule(LoyaltyCertModule);
