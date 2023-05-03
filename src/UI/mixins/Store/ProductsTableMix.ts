import Vue from 'vue'
import Component from 'vue-class-component'
import { ITableColumn } from "@/entity/table/table.types"

@Component
export class ProductsTableMix extends Vue {

    get shortColumns():ITableColumn[] {
        return [
            {
                title: 'наименование',
                dataIndex: 'name',
                key: 'name'
            }

        ]


    }
    get columns():ITableColumn[] {
        return [
            {
                title: 'наименование',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'цена продажи',
                dataIndex: 'selling_price_formated',
                key: 'selling_price_formated'
            },
            {
                title: 'ед.изм',
                dataIndex: 'product_unit.symbol',
                key: 'product_unit.symbol'
            },
            {
                title: 'комментарий',
                dataIndex: 'comment',
                key: 'comment'
            },
            {
                title: '',
                dataIndex: 'actions',
                scopedSlots: { customRender: 'operation' }
            },
        ]
    }
    get mColumns():ITableColumn[] {
        return [
            {
                title: 'наименование',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Артикул',
                dataIndex: 'vendor_code',
                key: 'vendor_code',
                scopedSlots: { customRender: 'vendor_code'},
            },
            {
                title: 'Штрихкод',
                dataIndex: 'barcode',
                key: 'barcode',
                scopedSlots: { customRender: 'barcode' },
            },
            {
                title: 'Цена продажи',
                dataIndex: 'selling_price',
                key: 'selling_price',
                scopedSlots: { customRender: 'selling_price' },
            },
            {
                title: 'Масса Нетто',
                dataIndex: 'net_weight',
                key: 'net_weight',
                scopedSlots: { customRender: 'net_weight' },
            },
            {
                title: 'Масса Брутто',
                dataIndex: 'gross_weight',
                key: 'gross_weight',
                scopedSlots: { customRender: 'gross_weight' },
            },

            {
                title: 'Себестоимость',
                dataIndex: 'cost_price',
                scopedSlots: { customRender: 'cost_price' }
            },
            {
                title: '',
                dataIndex: 'actions',
                scopedSlots: { customRender: 'operation' }
            },
        ]
    }
}