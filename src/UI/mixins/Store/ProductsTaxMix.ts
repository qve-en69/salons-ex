import Vue from 'vue'
import Component from 'vue-class-component'

import { IProductsTaxItem } from "@/entity/warehouse/Products/Tax/Tax.types"
import { ProductsTaxStore } from "@/store/modules/Warehouse/Tax";

@Component
export class ProductsTaxMix extends  Vue{
    get productsTaxData():IProductsTaxItem[] | null {
        return ProductsTaxStore.productsTax
    }

}
