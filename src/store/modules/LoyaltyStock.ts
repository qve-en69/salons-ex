import { Action, getModule, Module, MutationAction, VuexModule } from 'vuex-module-decorators';
import store from '@/store';
import {
    ILoyaltyStock,
    ILoyaltyStockListItem,
    LoyaltyStockResponseType
} from '@/entity/loyalty/loyaltyStock/LoyaltyStock.types';
import { PaginationRequestType } from '@/entity/common/pagination.types';
import { LoyaltyStockGeneralRequestType } from '@/form/loyalty/loyaltyStock/LoyaltyStockGeneral.types';
import { ResponseDataType } from '@/form/form.types';
import { createLogger } from 'vuex';

@Module({
    namespaced: true,
    name: 'loyaltyStock',
    store,
    dynamic: true
})
class LoyaltyStockModule extends VuexModule {
    delete(id: number) {
      throw new Error('Method not implemented.');
    }
    loyaltyStocks: ILoyaltyStock | null = null;
    loyaltyStock: ILoyaltyStockListItem | null = null;
    loyaltyStockLoaded = false;
    @MutationAction
    async fetchAll(data?: PaginationRequestType): Promise<{ loyaltyStocks: ILoyaltyStock; loyaltyStockLoaded: boolean }> {
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
        let loyaltyStockLoaded = false;
        const loyaltyStocks = await store.$repository.loyaltyStock.fetchAll(formData);

        if (loyaltyStocks) {
            loyaltyStockLoaded = true;
        }
        return { loyaltyStocks, loyaltyStockLoaded };
    }
    @Action({ rawError: true })
    async create(data: LoyaltyStockGeneralRequestType): Promise<ResponseDataType> {
        const resp = await store.$repository.loyaltyStock.create(data);
        return resp;
    }
    @Action({ rawError: true })
    async update(data: LoyaltyStockGeneralRequestType): Promise<ResponseDataType> {
        const resp = await store.$repository.loyaltyStock.update(data);
        return resp;
    }
    /*@MutationAction
    async fetchData(data: PaginationRequestType): Promise<{ salon: ILoyaltyStockListItem  ; counterpartiesLoaded: boolean }> {
        let counterpartiesLoaded = false;
        const salon = await store.$repository.counterparties.fetchData(data);
        if (salon) {
            counterpartiesLoaded = true;
        }
        return { salon, counterpartiesLoaded};
    }
    @Action({rawError: true})
    async create(data: LoyaltyStockGeneralRequestType): Promise<ResponseDataType> {
        const resp = await store.$repository.counterparties.create(data);
        return resp;
    }
    @Action({rawError: true})
    async update(data: LoyaltyStockGeneralRequestType): Promise<ResponseDataType> {
        const resp = await store.$repository.counterparties.update(data);
        return resp;
    }
    @Action({rawError: true})
    async delete(data: {id: number}): Promise<ResponseDataType> {
        const resp = await store.$repository.counterparties.delete(data);
        return resp;
    }*/
}

export const LoyaltyStockStore = getModule(LoyaltyStockModule);
