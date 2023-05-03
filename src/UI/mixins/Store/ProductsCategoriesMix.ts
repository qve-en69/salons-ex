import Vue from 'vue'
import Component from 'vue-class-component'

import { IProductsCategoryTitem, IProductsCategoryTypes } from "@/entity/warehouse/Products/Category/Category.types"
import { ProductsCategoriesStore  } from "@/store/modules/Warehouse/ProductsCategories"

@Component
export class ProductsCategoriesMix extends  Vue{
   get productsCategoriesData():IProductsCategoryTypes[] | null {
       return ProductsCategoriesStore.productsCategories
   }
  /* get productsCategory():IProductsCategoryTitem | null {
       return ProductsCategories.productsCategories
   }*/

}
