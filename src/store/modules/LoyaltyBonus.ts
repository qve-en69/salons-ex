import { Action, getModule, Module, MutationAction, VuexModule } from 'vuex-module-decorators';
import store from '@/store';
import {
    ILoyaltyBonus,
    ILoyaltyBonusListItem,
    LoyaltyBonusResponseType
} from '@/entity/loyalty/loyaltyBonus/loyaltyBonus/LoyaltyBonus.types';
import { PaginationRequestType } from '@/entity/common/pagination.types';
import { LoyaltyBonusGeneralRequestType } from '@/form/loyalty/loyaltyBonus/LoyaltyBonusGeneral.types';
import { ResponseDataType } from '@/form/form.types';
import { createLogger } from 'vuex';

@Module({
    namespaced: true,
    name: 'loyaltyBonus',
    store,
    dynamic: true
})
class LoyaltyBonusModule extends VuexModule {
    loyaltyBonuss: ILoyaltyBonus | null = null;
    loyaltyBonus: ILoyaltyBonusListItem | null = null;
    loyaltyBonusLoaded = false;
    @MutationAction
    async fetchAll(data?: PaginationRequestType): Promise<{ loyaltyBonuss: ILoyaltyBonus; loyaltyBonusLoaded: boolean }> {
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
        let loyaltyBonusLoaded = false;
        const loyaltyBonuss = await store.$repository.loyaltyBonus.fetchAll(formData);

        if (loyaltyBonuss) {
            loyaltyBonusLoaded = true;
        }
        return { loyaltyBonuss, loyaltyBonusLoaded };
    }
    @Action({ rawError: true })
    async create(data: LoyaltyBonusGeneralRequestType): Promise<ResponseDataType> {
        const resp = await store.$repository.loyaltyBonus.create(data);
        return resp;
    }
    @Action({ rawError: true })
    async update(data: LoyaltyBonusGeneralRequestType): Promise<ResponseDataType> {
        const resp = await store.$repository.loyaltyBonus.update(data);
        return resp;
    }
    /*@MutationAction
    async fetchData(data: PaginationRequestType): Promise<{ salon: ILoyaltyBonusListItem  ; counterpartiesLoaded: boolean }> {
        let counterpartiesLoaded = false;
        const salon = await store.$repository.counterparties.fetchData(data);
        if (salon) {
            counterpartiesLoaded = true;
        }
        return { salon, counterpartiesLoaded};
    }
    @Action({rawError: true})
    async create(data: LoyaltyBonusGeneralRequestType): Promise<ResponseDataType> {
        const resp = await store.$repository.counterparties.create(data);
        return resp;
    }
    @Action({rawError: true})
    async update(data: LoyaltyBonusGeneralRequestType): Promise<ResponseDataType> {
        const resp = await store.$repository.counterparties.update(data);
        return resp;
    }
    @Action({rawError: true})
    async delete(data: {id: number}): Promise<ResponseDataType> {
        const resp = await store.$repository.counterparties.delete(data);
        return resp;
    }*/
}

export const LoyaltyBonusStore = getModule(LoyaltyBonusModule);
