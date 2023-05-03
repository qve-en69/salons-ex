import Vue from 'vue'
import Component from "vue-class-component";
import {IManager} from "@/entity/manager/manager.types";
import { ManagerStore } from "@/store/modules/Manager"
@Component
export class ManagerMix extends Vue {

    get managers(): IManager[]{
        return  ManagerStore.manager
    }
}