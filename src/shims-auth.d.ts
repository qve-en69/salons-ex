import { VueAuth } from '@websanova/vue-auth';

declare module 'vue/types/vue' {
    interface VueConstructor {
        auth: VueAuth;
    }
}
declare module 'vue/types/vue' {
    interface Vue {
        auth: VueAuth;
    }
}
declare module 'vue/types/vue' {
    interface ComponentOptions<V extends Vue> {
        auth: VueAuth;
    }
}
