import Vue from 'vue'
import Component from 'vue-class-component'
import {ITableColumn} from "@/entity/table/table.types"
import { ProductsCategoriesStore } from   "@/store/modules/Warehouse/ProductsCategories"

@Component
export class ProductsCategoriesTableMix extends Vue {
    get CategoryColumns():ITableColumn[] {
        return [
            {
                title: 'Категории товаров',
                dataIndex: 'name',
                key: 'name'
            },
        ]
    }
}

