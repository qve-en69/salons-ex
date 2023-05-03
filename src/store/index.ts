import Vue from 'vue';
import Vuex, { Store } from 'vuex';
//import appFilters from "@/store/modules/appFilters";
Vue.use(Vuex);

interface appFilterItem {
    source:string;
    filters:Array<any>
}

export interface IState {
    //v: '0.1';
    salon_id: number | string | null;
    //filters:[]
}

export type IStore = Store<IState>;

const store = new Vuex.Store<IState>({
    state: {
        salon_id: ''
    },
    getters: {},
    mutations: {
       changeSalon (state, salon_id) {
         state.salon_id = salon_id;
       }
    },
    /*modules:{
        appFilters
    }*/
});

export default store;
