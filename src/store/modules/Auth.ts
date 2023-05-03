/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, getModule, Module, VuexModule } from 'vuex-module-decorators';
import Vue from 'vue';
import store from '@/store';
import { LoginRequestType } from '@/form/login/login.types';
import {RouterNameEnum} from "@/router/router.types";

@Module({
    namespaced: true,
    name: 'auth',
    store,
    dynamic: true,
})
class AuthModule extends VuexModule {

    @Action({rawError: true})
    async load(): Promise<any> {
        const aa = await Vue.auth.load();

        return aa;
    }

    @Action({ rawError: true })
    async login(data: LoginRequestType): Promise<any> {
        const formData = new FormData();
        formData.append('phone', data.phone);
        formData.append('password', data.password);
        return await Vue.auth.login({
            data: formData,
            fetchUser: false,
            staySignedIn: true,
        });
    }
    @Action
    async logout(): Promise<void> {
        await Vue.auth.logout({ redirect: { name: RouterNameEnum.AuthLogin } });
    }
}

export const AuthStore = getModule(AuthModule);
