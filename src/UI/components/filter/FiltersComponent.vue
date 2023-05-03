<template>
  <div>
    <a-space size="middle">
      <slot name="search-start"></slot>
        <div v-for="(filter, index) in filters.filterBody" v-bind:key="index">
          <div class="modal_label">{{filter.filterName}}</div>
          <a-select
            show-search
            option-filter-prop="children"
            :default-value="filters.default[index]" 
            style="width: 130px;" 
            @change="(value) => { handleChange(value, filter.filterCode) }" 
            @dropdownVisibleChange="visibleHandler"
            @search="(value) => { handleSearch(value, filter.filterCode) }"
            v-if="filter.filterType != 'date'">
            <template v-for="(item, idx) in filter.filterValue">
              <a-select-option :value="item.key" v-bind:key="idx">
                {{item.label}}
              </a-select-option>
            </template>
          </a-select>
          <a-date-picker
              style="width: 100%; height: 32px"
              placeholder="ДД.ММ.ГГГГ"
              @change="(value, code) => { handleChange(value, filter.filterCode) }"
              @openChange="visibleHandler"
              :format="'DD.MM.YYYY'"
              size="default"
              v-else
          />
        </div>
      <slot name="search-end"></slot>
    </a-space>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {SalonsStore} from "@/store/modules/Salons";
import {TerritoryStore} from "@/store/modules/Territory";
//import {ISalonsListItem} from "@/entity/salons/salons.types";
import Filters from "@/entity/filters/filters";
@Component
export default class FiltersComponent extends Vue {
  @Prop({required: true}) readonly filters!: Filters;
  @Prop({required: false}) readonly pagination!: Record<string, any>;
  
  filter: any = {};
  
  handleChange(value: string, code: string, event?: any): void {
    
    console.log('Filter - ')

    let val: any = value;
    if(code.includes('date') && val){
      val = val.format('DD.MM.YYYY');
    }

    if(this.filter[code] != undefined && (val == '0' || !val)){
      delete this.filter[code]; 
    }else{
      if(code == 'active'){
        this.filter[code] = val == '1' ? true : false;
      }else{
        this.filter[code] = val;
      }
    }

    let data: Record<string, any> = {
      limit: this.pagination.pageSize,
      filter: this.filter
    };

    //this.renderSalons(data);

    this.$emit('setFilterData', data);
  }

  async handleSearch(value: string, code: string): Promise<void> {
    
    this.$emit('handleSearch', value, code);

  }

  visibleHandler(open: any): void {
    let element = document.getElementsByClassName('layout ant-layout-content');
    if(open){
      element[0].classList.add('disable-scroll');
    }else{
      element[0].classList.remove('disable-scroll');
    }
  }

  /*async renderSalons(data: Record<string, any>): Promise<void>{
    await SalonsStore.fetchAll(data);

    if(SalonsStore.salons){
      this.$emit('setPagination', SalonsStore.salons.total);
    }
  }*/
}
</script>

<style lang="scss" scoped>
.modal_label {
  margin-bottom: 8px;
}
</style>