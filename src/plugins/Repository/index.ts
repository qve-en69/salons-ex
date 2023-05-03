import Vue from 'vue';
import { provider } from '@/repository/provider';
import { IStore } from '@/store';

export const prepareRepository = (store: IStore): void => {
    store.$repository = provider();

    Vue.mixin({
        beforeCreate() {
            this.$repository = store.$repository;
        },
    });
};
