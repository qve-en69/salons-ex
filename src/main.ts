import Vue, { VNode } from 'vue'
import App from './UI/App.vue'
import { router } from './router/router'
import Component from 'vue-class-component';

import '@/router/Routes/helpers/componentHooks'

import store from './store'
import '@/UI/assets/scss/main.scss'
import 'ant-design-vue/dist/antd.css'
import { prepareRepository } from '@/plugins'
import vuetify from './plugins/vuetify'
import i18n from './locales'


Vue.config.productionTip = false;
prepareRepository(store);
export const eventBus = new Vue()

Component.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate'
]);

new Vue({
    render: (h): VNode => h(App),
    router,
    i18n,
    store,
    vuetify,
}).$mount('#app');
