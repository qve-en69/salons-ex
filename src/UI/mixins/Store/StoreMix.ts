import Vue from 'vue'
import Component from 'vue-class-component'

import { IWarehouse, IWarehouseItem } from '@/entity/warehouse/Warehouse.types'
import { StoresStore } from '@/store/modules/Warehouse/Warehouse'

@Component
export class StoreMix extends Vue {

  get store(): IWarehouseItem | null {
    return StoresStore.WarehouseItem;
  }
  get stores(): IWarehouse | null {
    return StoresStore.warehouse;
  }
  
}