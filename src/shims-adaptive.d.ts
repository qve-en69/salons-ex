import Vue, { VueConstructor } from 'vue';
import {IAdaptive} from '@/entity/common/adaptive.types';
declare module 'vue/types/vue' {
    interface VueConstructor {
        $adaptive: IAdaptive;
    }
}
declare module 'vue/types/vue' {
    interface Vue {
        $adaptive: IAdaptive;
    }
}
declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        adaptive?: IAdaptive;
    }
}
