import Vue from 'vue'
import Component from 'vue-class-component'

import { IWarehouseTypes } from '@/entity/warehouse/Type/Warehouse.type.types'
import { StoresTypes } from '@/store/modules/Warehouse/StoresTypes'

@Component
export class StoreTypeMix extends Vue {
  get storeTypes(): IWarehouseTypes[] | null  {
    return StoresTypes.storesTypes;
  }

}