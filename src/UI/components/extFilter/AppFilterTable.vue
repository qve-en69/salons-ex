<template>
  <div v-if="this.formReady">
    <a-form-model :model="formData" :layout="formLayout" @change="onformChange" >
    <template v-for="(filter) in filters" >
      <template v-if="(filter.type === 'date')">
        <a-form-item
            :key="`itmd-${filter.key}`"
            :label="filter.label"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"

        >
          <a-date-picker
              :key="filter.key"
              :style="filter.style"
              placeholder="ДД.ММ.ГГГГ"
              @change="filter.onChange"
              v-model="formData[filter.key]"
              :format="'DD.MM.YYYY'"


              size="default"
          />
        </a-form-item>
      </template>
      <template v-if="(filter.type === 'input')" >
        <a-form-item
            :key="`itmd-${filter.key}`"
            :label="filter.label"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"


        >
          <a-input
              :key="filter.key"
              :placeholder="filter.placeholder"
              :style="filter.style"
              :data="filter"
              v-model="formData[filter.key]"

              @change="filter.onChange"
              @search="filter.onSearch"
          />
        </a-form-item>
      </template>

      <template v-if="(filter.type === 'source')" >
        <a-form-item
            :key="`itmd-${filter.key}`"
            :label="filter.label"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"

        >
          <a-select
              show-search
              :placeholder="filter.placeholder"
              :show-arrow="true"
              :filter-option="false"
              :not-found-content="null"
              :style="filter.style"
              v-model="formData[filter.key]"

              @change="filter.onChange"
              @search="filter.onSearch"

              :key="filter.key">
            <template v-if="filter.source" >
              <a-select-option v-for="d in filter.source" :key="d.id">
                {{d.name}}
              </a-select-option>
            </template>
          </a-select>

        </a-form-item>
      </template>

      <template v-if="(filter.type === 'select')" >
        <a-form-item
            :key="`itmd-${filter.key}`"
            :label="filter.label"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"

        >
          <a-select
              show-search
              :placeholder="filter.placeholder"
              :show-arrow="true"
              :filter-option="false"
              :not-found-content="null"
              :style="filter.style"
              v-model="formData[filter.key]"

              @change="filter.onChange"
              @search="filter.onSearch"
              :key="filter.key"
          >
            <a-select-option v-for="d in filter.value" :key="d.key">
              {{d.label}}
            </a-select-option>
          </a-select>
        </a-form-item>
      </template>
    </template>
    <template>
    <a-form-item>
      <a-button @click="clearFilter">Очитсить фильтр</a-button>
    </a-form-item>
    </template>
  </a-form-model>
  </div>
</template>



<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator"
import { FilterList } from "@/entity/filters/extFilter"
import { mapState } from 'vuex'
import { appPaginationStore } from "@/store/modules/appPagination"
import { appFiltersStore } from "@/store/modules/appFilters"
import { SalonsStore } from "@/store/modules/Salons";
import {AppFilters} from "@/UI/components/extFilter/AppFilters";
import {RouterNameEnum} from "@/router/router.types";

//https://antdv.com/components/form/#components-form-demo-global-state

@Component
export default class AppFilterTable extends Vue {
  @Prop({required: true}) readonly filters!: FilterList[];
  @Prop({required: true}) readonly source!: string;



  formReady = false
    formData= {}

  constructor() {
    super();
    this.formReady = true
  }
  formLayout = 'inline'
  async created(): Promise<void>{
    //console.log('Filters -'+JSON.parse(this.$route.params.filter))
  }


  @Watch('formData')
  wTd(value:any){

    //this.$emit('handleTableChange')
    let routeName = ''
    let filter = {};
    if (this.$props.source==='salons'){
      routeName=RouterNameEnum.SalonsPage
      filter = appFiltersStore.salons

      //this.$router.push({name: routeName,  params: { page: this.AppPageParams.current.toString(), total:this.AppPageParams.total.toString(), filter:JSON.stringify(filter)}})

    }
    if (this.$props.source==='clients'){
      routeName=RouterNameEnum.Clients

    }
    if (this.$props.source==='stores'){
      routeName=RouterNameEnum.Stores

    }
  }

  onformChange(value:any): any {

  }


  onSearch(value:any):any {

  }

  vFilter(field:any):any{

  }
  isFiltered(filter:FilterList):boolean{
    let result = false

    if (this.$props.source==='salons'){
      result = filter.fieldNames[0] in appFiltersStore.SalonsFilter
    }
    if (this.$props.source==='clients'){
      result = filter.fieldNames[0] in appFiltersStore.ClientsFilter
    }
    if (this.$props.source==='stores'){
      result = filter.fieldNames[0] in appFiltersStore.StoresFilter
    }
    console.log('isFilter ===='+ result)
    return result

  }

  async clearFilter() {
    //this.form.resetFields();
    this.formData = {}

    if (this.$props.source==='salons'){
      appFiltersStore.clearAllfiltersSalon()
      await SalonsStore.fetchAll({
        limit:appPaginationStore.PageParams.pageSize, filter:appFiltersStore.salons});

      appPaginationStore.setTotal(SalonsStore.salons!.total)
    }
    if (this.$props.source==='clients'){

    }
    if (this.$props.source==='stores'){

    }
  }
  closeFilter(val:any):void {
    console.log('close filter')
    const fieldName = val.fieldNames[0]
    if (this.$props.source==='salons'){
      appFiltersStore.clearfilterSalonField(fieldName)
    }
    if (this.$props.source==='clients'){

    }
    if (this.$props.source==='stores'){

    }
  }
  formItemLayout():any {
    const { formLayout } = this;
    return formLayout === 'horizontal'
        ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }
        : {};
  }
  buttonItemLayout():any {
    const { formLayout } = this;
    return formLayout === 'horizontal'
        ? {
          wrapperCol: { span: 14, offset: 4 },
        }
        : {};
  }
  visibleHandler(open: any): void {
    let element = document.getElementsByClassName('layout ant-layout-content');
    if(open){
      element[0].classList.add('disable-scroll');
    }else{
      element[0].classList.remove('disable-scroll');
    }
  }

}
</script>
