import Vue from 'vue';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import auth from '@websanova/vue-auth/src';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import authBearer from './bearer';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import axios from '@websanova/vue-auth/drivers/http/axios.1.x';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import router from '@websanova/vue-auth/drivers/router/vue-router.2.x';
import { RouterNameEnum } from '@/router/router.types';

Vue.use(auth, {
    auth: authBearer,
    http: axios,
    router: router,
    rolesKey: 'type',
    tokenDefaultKey: 'token',
    tokenStore: ['localStorage'],

    // Redirects
    authRedirect: { name: RouterNameEnum.AuthLogin },
    forbiddenRedirect: { path: '/403' },
    notFoundRedirect: { path: '/404' },
    // Http
    loginData: {
        url: '/login',
        method: 'POST',
        redirect: '/',
    },
    refreshData: {
        url: '/user',
        method: 'POST',
        enabled: false,
        interval: 5,
    },
    fetchData: {
        url: '',
        enabled: false,
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parseUserData: (data: Array<any>) => data,
});
