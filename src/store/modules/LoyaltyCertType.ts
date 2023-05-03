import { Action, getModule, Module, MutationAction, VuexModule } from 'vuex-module-decorators';
import store from '@/store';
import {
    ILoyaltyCertType,
    ILoyaltyCertTypeListItem,
} from '@/entity/loyalty/loyaltyCert/loyaltyCertType/LoyaltyCertType.types';
import { PaginationRequestType } from '@/entity/common/pagination.types';
import { LoyaltyCertTypeGeneralRequestType } from '@/form/loyalty/loyaltyCertType/LoyaltyCertTypeGeneral.types';
import { LoyaltyCertTypeAddFormRequestType } from '@/form/loyalty/loyaltyCertType/LoyaltyCertTypeAddForm.types';
import { ResponseDataType } from '@/form/form.types';

@Module({
    namespaced: true,
    name: 'loyaltyCertType',
    store,
    dynamic: true
})
class LoyaltyCertTypeModule extends VuexModule {
    loyaltyCertTypes: ILoyaltyCertType | null = null;
    loyaltyCertType: ILoyaltyCertTypeListItem | null = null;
    loyaltyCertTypeLoaded = false;
    loyaltyCertTypesLoaded = false;
    @MutationAction
    async fetchAll(
        data?: PaginationRequestType
    ): Promise<{ loyaltyCertTypes: ILoyaltyCertType; loyaltyCertTypeLoaded: boolean }> {
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
        }
        let loyaltyCertTypeLoaded = false;
        const loyaltyCertTypes = await store.$repository.loyaltyCertType.fetchAll(formData);

        if (loyaltyCertTypes) {
            loyaltyCertTypeLoaded = true;
        }
        return { loyaltyCertTypes, loyaltyCertTypeLoaded };
    }
    @Action({ rawError: true })
    async create(data: LoyaltyCertTypeAddFormRequestType): Promise<ResponseDataType> {
        console.log(data);
        //       console.log('1');
        const resp = await store.$repository.loyaltyCertType.create(data);
        console.log(resp);
        return resp;
    }
    @Action({ rawError: true })
    async update(data: LoyaltyCertTypeGeneralRequestType): Promise<ResponseDataType> {
        const resp = await store.$repository.loyaltyCertType.update(data);
        return resp;
    }
    /*@MutationAction
    async fetchData(data: PaginationRequestType): Promise<{ salon: ILoyaltyCertTypeListItem  ; counterpartiesLoaded: boolean }> {
        let counterpartiesLoaded = false;
        const salon = await store.$repository.counterparties.fetchData(data);
        if (salon) {
            counterpartiesLoaded = true;
        }
        return { salon, counterpartiesLoaded};
    }
    @Action({rawError: true})
    async create(data: LoyaltyCertTypeGeneralRequestType): Promise<ResponseDataType> {
        const resp = await store.$repository.counterparties.create(data);
        return resp;
    }
    @Action({rawError: true})
    async update(data: LoyaltyCertTypeGeneralRequestType): Promise<ResponseDataType> {
        const resp = await store.$repository.counterparties.update(data);
        return resp;
    }
    @Action({rawError: true})
    async delete(data: {id: number}): Promise<ResponseDataType> {
        const resp = await store.$repository.counterparties.delete(data);
        return resp;
    }*/
}

export const LoyaltyCertTypeStore = getModule(LoyaltyCertTypeModule);
