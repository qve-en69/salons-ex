import Vue from 'vue'
import Component from 'vue-class-component'

import { IProductsUnitItem  } from "@/entity/warehouse/Products/Unit/Unit.types"
import {ProductsUnitStore} from "@/store/modules/Warehouse/ProductsUnit";

@Component
export class ProductsUnitMix extends  Vue{
    get productsUnitData():IProductsUnitItem[] | null {
        return ProductsUnitStore.productsUnit
    }
    /* get productsCategory():IProductsCategoryTitem | null {
         return ProductsCategories.productsCategories
     }*/

}
