import { Action, getModule, Module, MutationAction, VuexModule } from 'vuex-module-decorators';
import store from '@/store';
import {
    ILoyaltySubscriptionType,
    ILoyaltySubscriptionTypeListItem,
    LoyaltySubscriptionTypeResponseType
} from '@/entity/loyalty/loyaltySubscription/loyaltySubscriptionType/LoyaltySubscriptionType.types';
import { PaginationRequestType } from '@/entity/common/pagination.types';
import { LoyaltySubscriptionTypeGeneralRequestType } from '@/form/loyalty/loyaltySubscriptionType/LoyaltySubscriptionTypeGeneral.types';
import { ResponseDataType } from '@/form/form.types';
import { createLogger } from 'vuex';

@Module({
    namespaced: true,
    name: 'loyaltySubscriptionType',
    store,
    dynamic: true
})
class LoyaltySubscriptionTypeModule extends VuexModule {
    loyaltySubscriptionTypes: ILoyaltySubscriptionType | null = null;
    loyaltySubscriptionType: ILoyaltySubscriptionTypeListItem | null = null;
    loyaltySubscriptionTypeLoaded = false;
    @MutationAction
    async fetchAll(data?: PaginationRequestType): Promise<{ loyaltySubscriptionTypes: ILoyaltySubscriptionType; loyaltySubscriptionTypeLoaded: boolean }> {
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
        let loyaltySubscriptionTypeLoaded = false;
        const loyaltySubscriptionTypes = await store.$repository.loyaltySubscriptionType.fetchAll(formData);

        if (loyaltySubscriptionTypes) {
            loyaltySubscriptionTypeLoaded = true;
        }
        return { loyaltySubscriptionTypes, loyaltySubscriptionTypeLoaded };
    }
    @Action({ rawError: true })
    async create(data: LoyaltySubscriptionTypeGeneralRequestType): Promise<ResponseDataType> {
        const resp = await store.$repository.loyaltySubscriptionType.create(data);
        return resp;
    }
    @Action({ rawError: true })
    async update(data: LoyaltySubscriptionTypeGeneralRequestType): Promise<ResponseDataType> {
        const resp = await store.$repository.loyaltySubscriptionType.update(data);
        return resp;
    }
    /*@MutationAction
    async fetchData(data: PaginationRequestType): Promise<{ salon: ILoyaltySubscriptionTypeListItem  ; counterpartiesLoaded: boolean }> {
        let counterpartiesLoaded = false;
        const salon = await store.$repository.counterparties.fetchData(data);
        if (salon) {
            counterpartiesLoaded = true;
        }
        return { salon, counterpartiesLoaded};
    }
    @Action({rawError: true})
    async create(data: LoyaltySubscriptionTypeGeneralRequestType): Promise<ResponseDataType> {
        const resp = await store.$repository.counterparties.create(data);
        return resp;
    }
    @Action({rawError: true})
    async update(data: LoyaltySubscriptionTypeGeneralRequestType): Promise<ResponseDataType> {
        const resp = await store.$repository.counterparties.update(data);
        return resp;
    }
    @Action({rawError: true})
    async delete(data: {id: number}): Promise<ResponseDataType> {
        const resp = await store.$repository.counterparties.delete(data);
        return resp;
    }*/
}

export const LoyaltySubscriptionTypeStore = getModule(LoyaltySubscriptionTypeModule);
