import Vue from 'vue'
import {Component, Watch} from 'vue-property-decorator'
import { ISalons } from "@/entity/salons/salons.types"
import { SalonsStore } from "@/store/modules/Salons"
import { PaginationMix } from '@/UI/mixins/PaginationMix'
import { FormMix } from "@/UI/mixins/FormMix"
import { mixins } from "vue-class-component"

@Component
export class SalonsMix extends mixins (PaginationMix, FormMix) {
  get salons(): ISalons | null  {
    return SalonsStore.salons;
  }

  /*@Watch('salons')
  wSalons(value:any):void {
    //this.AppPageParams.total = this.salons!.total
    this.AppPageParams.total = this.salons!.total
    console.log('warehouse value -'+ value)
    this.tableLoad = true
  }*/
}