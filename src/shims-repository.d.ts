import { IProvider } from '@/repository/provider.types';

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        repository?: IProvider;
    }
}

declare module 'vue/types/vue' {
    interface Vue {
        $repository: IProvider;
    }
}

declare module 'vuex/types/index' {
    interface Store<S> {
        $repository: IProvider;
    }
}
