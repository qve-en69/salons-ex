import Vue from 'vue'
import Component from 'vue-class-component'

import { IProducts, IProductsItem } from "@/entity/warehouse/Products/Products.types"
import { ProductsStore } from "@/store/modules/Warehouse/Products";

@Component
export class ProductsMix extends Vue {
    get products(): IProducts | null {
        return ProductsStore.products
    }
    get product(): IProductsItem | null {
        return ProductsStore.product
    }
}