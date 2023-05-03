import { Action, getModule, Module, MutationAction, VuexModule } from 'vuex-module-decorators';
import store from '@/store';
import {
    ILoyaltyBonusType,
    ILoyaltyBonusTypeListItem,
    LoyaltyBonusTypeResponseType
} from '@/entity/loyalty/loyaltyBonus/loyaltyBonusType/LoyaltyBonusType.types';
import { PaginationRequestType } from '@/entity/common/pagination.types';
import { LoyaltyBonusTypeGeneralRequestType } from '@/form/loyalty/loyaltyBonusType/LoyaltyBonusTypeGeneral.types';
import { ResponseDataType } from '@/form/form.types';
import { createLogger } from 'vuex';

@Module({
    namespaced: true,
    name: 'loyaltyBonusType',
    store,
    dynamic: true
})
class LoyaltyBonusTypeModule extends VuexModule {
    loyaltyBonusTypes: ILoyaltyBonusType | null = null;
    loyaltyBonusType: ILoyaltyBonusTypeListItem | null = null;
    loyaltyBonusTypeLoaded = false;
    @MutationAction
    async fetchAll(data?: PaginationRequestType): Promise<{ loyaltyBonusTypes: ILoyaltyBonusType; loyaltyBonusTypeLoaded: boolean }> {
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
        let loyaltyBonusTypeLoaded = false;
        const loyaltyBonusTypes = await store.$repository.loyaltyBonusType.fetchAll(formData);

        if (loyaltyBonusTypes) {
            loyaltyBonusTypeLoaded = true;
        }
        return { loyaltyBonusTypes, loyaltyBonusTypeLoaded };
    }
    @Action({ rawError: true })
    async create(data: LoyaltyBonusTypeGeneralRequestType): Promise<ResponseDataType> {
        const resp = await store.$repository.loyaltyBonusType.create(data);
        return resp;
    }
    @Action({ rawError: true })
    async update(data: LoyaltyBonusTypeGeneralRequestType): Promise<ResponseDataType> {
        const resp = await store.$repository.loyaltyBonusType.update(data);
        return resp;
    }
    /*@MutationAction
    async fetchData(data: PaginationRequestType): Promise<{ salon: ILoyaltyBonusTypeListItem  ; counterpartiesLoaded: boolean }> {
        let counterpartiesLoaded = false;
        const salon = await store.$repository.counterparties.fetchData(data);
        if (salon) {
            counterpartiesLoaded = true;
        }
        return { salon, counterpartiesLoaded};
    }
    @Action({rawError: true})
    async create(data: LoyaltyBonusTypeGeneralRequestType): Promise<ResponseDataType> {
        const resp = await store.$repository.counterparties.create(data);
        return resp;
    }
    @Action({rawError: true})
    async update(data: LoyaltyBonusTypeGeneralRequestType): Promise<ResponseDataType> {
        const resp = await store.$repository.counterparties.update(data);
        return resp;
    }
    @Action({rawError: true})
    async delete(data: {id: number}): Promise<ResponseDataType> {
        const resp = await store.$repository.counterparties.delete(data);
        return resp;
    }*/
}

export const LoyaltyBonusTypeStore = getModule(LoyaltyBonusTypeModule);
