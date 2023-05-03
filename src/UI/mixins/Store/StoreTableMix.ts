import Vue from 'vue';
import Component from 'vue-class-component';
import { ITableColumn } from '@/entity/table/table.types';

@Component
export class StoreTableMix extends Vue {
    get columns(): ITableColumn[] {
        return [
            {
                title: '',
                dataIndex: '',
                scopedSlots: { customRender: 'menu' }
            },
            {
                title: 'наименование',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'кол-во товаров',
                dataIndex: 'product_count',
                key: 'product_count'
            },
            {
                title: '',
                dataIndex: 'id',
                key: 'id',
                scopedSlots: {
                    customRender: 'action'
                }
            }
        ];
    }
}
