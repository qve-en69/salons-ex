<template>
  <div>
        <div class="box-container">
            <PageTitle>
                <template v-slot:default>Продажи по услугам</template>
                <template v-slot:button>
                    <a-button icon="plus-circle" type="dashed" 
                                @click="$router.push({name: $routeRules.SalonCreation})">Выгрузить в Excel
                    </a-button>
                </template>

            </PageTitle>    
            <FiltersComponent :filters="filters" @setPagination="setPagination" :pagination="pagination" @setFilterData="setFilterData" />
        </div>    

  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import {mixins} from 'vue-class-component'

import { SalonsMix } from '@/UI/mixins/SalonsMix'
import { CategoryMix } from '@/UI/mixins/CategoryMix'

import PageTitle from "@/UI/components/common/PageTitle.vue"
import {IFilters} from "@/entity/filters/filters.types";
import Filters from "@/entity/filters/filters";
import FiltersComponent from "@/UI/components/filter/FiltersComponent.vue";
import {FiltersStore} from "@/store/modules/Filters";

import {TablesStore} from "@/store/modules/Tables";

import DrawerWrapper from "@/UI/components/common/DrawerWrapper.vue"
import WorkerDetail from "@/UI/components/workerDetail/WorkerDetail.vue"
import { ITableColumn } from '@/entity/table/table.types';


import { SalonsStore } from "@/store/modules/Salons"
import { CategoryStore } from '@/store/modules/Category'

@Component({
  components: {WorkerDetail, DrawerWrapper, PageTitle, FiltersComponent}
})
export default class byService extends mixins(SalonsMix, CategoryMix) {
  searchText = '';
  searchedColumn = '';  
  filters: Filters;
  pagination = {
    showSizeChanger: true,
    pageSize: 10,
    total: 500,
  }
  filterData: any;
  
  get filtersSales(): IFilters[] {
    return FiltersStore.filtersReportSalesbyServiceColumns
  }
  /* get filtersSalons(): IFilters[] {
    return FiltersStore.filtersSalons;
  } */
  get columns(): ITableColumn[] {
      return TablesStore.ReportSalesbyServiceColumns
  }
  /* get salons(): ISalons | null {
    return SalonsStore.salons;
  } */

  constructor() {
    super();
    this.filters = new Filters(this.filtersSales);
    
    //this.filters = new Filters(this.filtersSales);
    this.filterData = {
      limit: this.pagination.pageSize,
    }
  }
   
  async created(): Promise<void> {

      //const token = localStorage.getItem('token');
      await SalonsStore.fetchAll({limit: 20});
      await CategoryStore.fetchAll();

      if (this.salons) {
        /* this.filtersSalons[1].filterValue.splice(1, this.filtersSalons[1].filterValue.length);
        this.filtersSalons[4].filterValue.splice(1, this.filtersSalons[4].filterValue.length); */
        console.log('salons '+this.salons.data.length)
      }
      if (this.category) {
        console.log('category '+this.category.length)
      }

  }
  
  setPagination(val: any): void {
    this.pagination.total = val;
  }
  
  setFilterData(data: any): void {
    this.filterData = data;
  }
}
</script>
