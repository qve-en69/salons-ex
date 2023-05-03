import {getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import store from '@/store';

@Module({
    namespaced: true,
    name: 'adaptive',
    store,
    dynamic: true,
})
class AdaptiveModule extends VuexModule {
    isMobile = false;
    isTablet = false;

    @Mutation
    resolveAdaptive(breakpointName: string): void {
        this.isTablet = false;
        this.isMobile = false;
        switch (breakpointName) {
            case 'xs': this.isMobile = true; break;
            case 'sm': this.isMobile = true; break;
            case 'md': this.isTablet = true; break;
        }
    }
}

export const AdaptiveStore = getModule(AdaptiveModule);
