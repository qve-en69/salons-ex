import Vue from 'vue'
import { ICity } from "@/entity/territory/territory.types";
import Component from "vue-class-component";
import {TerritoryStore} from "@/store/modules/Territory";

@Component
export class CityMix extends  Vue {
    get cityLoaded(): boolean {
        return TerritoryStore.citiesLoaded;
    }
    get cities(): ICity[] {
        return TerritoryStore.cities;
    }
}
