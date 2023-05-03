import Vue from 'vue'
import Component from 'vue-class-component'

import { IProductsTaxSystemItem } from "@/entity/warehouse/Products/TaxSystem/TaxSystem.types"
import { ProductsTaxSystemStore } from "@/store/modules/Warehouse/TaxSystem";

@Component
export class ProductsTaxSystemMix extends  Vue{
    get productsTaxSystemData():IProductsTaxSystemItem[] | null {
        return ProductsTaxSystemStore.productsTaxSystem
    }

}
