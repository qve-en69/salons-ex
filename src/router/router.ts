/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Vue from 'vue';
import Router from 'vue-router';
import { RouterNameEnum } from '@/router/router.types';

import {StoreRoutes} from "@/router/Routes/store";
import {BaseRoutes} from "@/router/Routes/base";
import {StudiosRoutes} from "@/router/Routes/studios";
import {ReportRoutes} from "@/router/Routes/reports";
import {ClientRoutes} from "@/router/Routes/clients";
import {ServicesRoutes} from "@/router/Routes/service";
import {LoyaltyRoutes} from "@/router/Routes/loyalty";
import {FinanceRoutes} from "@/router/Routes/finane";

Vue.use(Router);
Vue.prototype.$routeRules = RouterNameEnum;
/*const routes = [

];*/
const AppRoutes =[
    ...BaseRoutes,
    ...StudiosRoutes,
    ...StoreRoutes,
    ...ReportRoutes,
    ...ClientRoutes,
    ...ServicesRoutes,
    ...LoyaltyRoutes,
    ...FinanceRoutes
]
Vue.router = new Router({
    mode: 'history',
    fallback: false,
    base: process.env.BASE_URL,
    //routes,
    routes: AppRoutes
});
export const router = Vue.router;
//export const getRoutes = () => AppRoutes;

router.beforeEach((to, from, next) => {
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
    if (nearestWithTitle) {
        document.title = nearestWithTitle.meta.title;
    }
    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode?.removeChild(el));
    if (!nearestWithMeta) {
        return next();
    }
    nearestWithMeta.meta.metaTags.map((tagDef: any) => {
        const tag = document.createElement('meta');
        Object.keys(tagDef).forEach(key => {
            tag.setAttribute(key, tagDef[key]);
        });
        tag.setAttribute('data-vue-router-controlled', '');
        return tag;
    })
        .forEach((tag: any) => document.head.appendChild(tag));
    next();
});
router.onError((error) => {
    const pattern = /Loading chunk chunk-(\d)+ failed/g;
    const isChunkLoadFailed = error.message.match(pattern);
    const targetPath = router.currentRoute.fullPath;
    if (isChunkLoadFailed) {
        router.replace(targetPath);
    }
});
