import { Action, getModule, Module, MutationAction, VuexModule } from 'vuex-module-decorators';
import store from '@/store';
import { ISalons, ISalonsListItem } from "@/entity/salons/salons.types"
import { PaginationRequestType } from "@/entity/common/pagination.types"
import { SalonGeneralRequestType } from "@/form/salonGeneral/salonGeneral.types"
import { ResponseDataType } from "@/form/form.types"
import { appPaginationStore } from '@/store/modules/appPagination'

import { createLogger } from "vuex"

@Module({
    namespaced: true,
    name: 'salons',
    store,
    dynamic: true,
})
class SalonsModule extends VuexModule {
    salons: ISalons | null = null;
    salon: ISalonsListItem | null = null;
    salonLoaded = false;
    salonsLoaded = false;

    @MutationAction
    async fetchAll(data?: PaginationRequestType): Promise<{ salons: ISalons; salonsLoaded: boolean }> {
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
        let salonsLoaded = false;
        const salons = await store.$repository.salons.fetchAll(formData);
        if (salons) {
            salonsLoaded = true;
        }
        return { salons, salonsLoaded};
    }
    @MutationAction
    async fetchData(data: PaginationRequestType): Promise<{ salon: ISalonsListItem  ; salonLoaded: boolean }> {
        let salonLoaded = false;
        const salon = await store.$repository.salons.fetchData(data);
        if (salon) {
            salonLoaded = true;
        }
        return { salon, salonLoaded};
    }
    @Action({rawError: true})
    async create(data: SalonGeneralRequestType): Promise<ResponseDataType> {
        const resp = await store.$repository.salons.create(data);
        return resp;
    }
    @Action({rawError: true})
    async update(data: SalonGeneralRequestType): Promise<ResponseDataType> {
        const resp = await store.$repository.salons.update(data);
        return resp;
    }
    @Action({rawError: true})
    async delete(data: {id: number}): Promise<ResponseDataType> {
        const resp = await store.$repository.salons.delete(data);
        return resp;
    }

    /*@Action
    setFilter (filter:any):any {
        console.log('filter -'+filter)
    }
    @MutationAction
    getFilter ():any {
        return warehouse.state.filters
    }*/
}

export const SalonsStore = getModule(SalonsModule);
