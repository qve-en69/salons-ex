/* eslint-disable */
/* tslint:disable */

import Vue from 'vue';

const shared = new Vue({data:{ isMobile: false }})
// @ts-ignore
shared.install = function(){
    Object.defineProperty(Vue.prototype, '$adaptive', {
        get () { return shared }
    })
}
// @ts-ignore
Vue.use(shared);
