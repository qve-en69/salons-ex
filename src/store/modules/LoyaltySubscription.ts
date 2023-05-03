import { Action, getModule, Module, MutationAction, VuexModule } from 'vuex-module-decorators';
import store from '@/store';
import {
    ILoyaltySubscription,
    ILoyaltySubscriptionListItem,
    LoyaltySubscriptionResponseType
} from '@/entity/loyalty/loyaltySubscription/loyaltySubscription/LoyaltySubscription.types';
import { PaginationRequestType } from '@/entity/common/pagination.types';
import { LoyaltySubscriptionGeneralRequestType } from '@/form/loyalty/loyaltySubscription/LoyaltySubscriptionGeneral.types';
import { ResponseDataType } from '@/form/form.types';
import { createLogger } from 'vuex';

@Module({
    namespaced: true,
    name: 'loyaltySubscription',
    store,
    dynamic: true
})
class LoyaltySubscriptionModule extends VuexModule {
    loyaltySubscriptions: ILoyaltySubscription | null = null;
    loyaltySubscription: ILoyaltySubscriptionListItem | null = null;
    loyaltySubscriptionLoaded = false;
    @MutationAction
    async fetchAll(data?: PaginationRequestType): Promise<{ loyaltySubscriptions: ILoyaltySubscription; loyaltySubscriptionLoaded: boolean }> {
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
        let loyaltySubscriptionLoaded = false;
        const loyaltySubscriptions = await store.$repository.loyaltySubscription.fetchAll(formData);

        if (loyaltySubscriptions) {
            loyaltySubscriptionLoaded = true;
        }
        return { loyaltySubscriptions, loyaltySubscriptionLoaded };
    }
    @Action({ rawError: true })
    async create(data: LoyaltySubscriptionGeneralRequestType): Promise<ResponseDataType> {
        const resp = await store.$repository.loyaltySubscription.create(data);
        return resp;
    }
    @Action({ rawError: true })
    async update(data: LoyaltySubscriptionGeneralRequestType): Promise<ResponseDataType> {
        const resp = await store.$repository.loyaltySubscription.update(data);
        return resp;
    }
    /*@MutationAction
    async fetchData(data: PaginationRequestType): Promise<{ salon: ILoyaltySubscriptionListItem  ; counterpartiesLoaded: boolean }> {
        let counterpartiesLoaded = false;
        const salon = await store.$repository.counterparties.fetchData(data);
        if (salon) {
            counterpartiesLoaded = true;
        }
        return { salon, counterpartiesLoaded};
    }
    @Action({rawError: true})
    async create(data: LoyaltySubscriptionGeneralRequestType): Promise<ResponseDataType> {
        const resp = await store.$repository.counterparties.create(data);
        return resp;
    }
    @Action({rawError: true})
    async update(data: LoyaltySubscriptionGeneralRequestType): Promise<ResponseDataType> {
        const resp = await store.$repository.counterparties.update(data);
        return resp;
    }
    @Action({rawError: true})
    async delete(data: {id: number}): Promise<ResponseDataType> {
        const resp = await store.$repository.counterparties.delete(data);
        return resp;
    }*/
}

export const LoyaltySubscriptionStore = getModule(LoyaltySubscriptionModule);
