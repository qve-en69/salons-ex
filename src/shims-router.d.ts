import { VueRouter } from 'vue-router/types/router';
import { RouterNameEnum } from '@/router/router.types';
declare module 'vue/types/vue' {
    interface VueConstructor {
        router: VueRouter;
        $routeRules: typeof RouterNameEnum;
    }
}
declare module 'vue/types/vue' {
    interface Vue {
        router: VueRouter;
        $routeRules: typeof RouterNameEnum;
    }
}
declare module 'vue/types/vue' {
    interface ComponentOptions<V extends Vue> {
        router: VueRouter;
        $routeRules: typeof RouterNameEnum;
    }
}
