<template>
  <div class="salons">
    <template v-if="this.formReady">
      <div class="box-container">
        <PageTitle>
          <template v-slot:default>Студии</template>
          <template v-slot:button>
            <a-button icon="plus-circle" type="primary" size="large"
                      @click="$router.push({name: $routeRules.SalonCreation})">Создать студию
            </a-button>
          </template>
        </PageTitle>
        <AppFilterTable :filters="FiltersStudio" source="salons"/>
        <a-table
            style="margin-top: 24px;"
            bordered
            :columns="columns"
            :data-source="salons != undefined && salons != null ? salons.data : []"
            :pagination="AppPageParams"
            :loading="!this.tableLoad"
            :customRow="customRow"
            @change="handleTableChange"
        >
        <span slot="active" slot-scope="active">
          <a-tag
              :color="active ? 'green' : 'red'"
          >
            {{ active ? 'Активна' : 'Не активна' }}
          </a-tag>
        </span>
        </a-table>
      </div>
    </template>
    <template v-else>
      <div>
        <a-alert
            message="Загрузка данных"
            type="info"
            show-icon
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import PageTitle from "@/UI/components/common/PageTitle.vue"
import {FiltersSalonsNameEnum} from "@/entity/filters/filters.types"

//import Filters from "@/entity/filters/filters"
//import FiltersComponent from "@/UI/components/filter/FiltersComponent.vue"
import {ITableColumn} from "@/entity/table/table.types"
import {TablesStore} from "@/store/modules/Tables"
import {RouterNameEnum} from "@/router/router.types"
import {appFiltersStore} from "@/store/modules/appFilters"
import {TerritoryStore} from "@/store/modules/Territory"
import {ManagerStore} from "@/store/modules/Manager"
import {PartnerStore} from "@/store/modules/Partner"

import {ProxyDataForm} from '@/UI/components/Helpers/ProxyDataForm'
import {mixins} from 'vue-class-component'
import {CityMix} from "@/UI/mixins/CityMix"
import {ManagerMix} from "@/UI/mixins/ManagerMix";
import {FilterList} from "@/entity/filters/extFilter"

import {SalonsMix} from "@/UI/mixins/SalonsMix";
import AppFilterTable from '@/UI/components/extFilter/AppFilterTable.vue'
import {AppFilters} from "@/UI/components/extFilter/AppFilters";

@Component({
  components: {
    PageTitle,
    AppFilterTable
  }
})
export default class Salons extends mixins(ProxyDataForm, CityMix, SalonsMix, ManagerMix ) {
  customRow = (record: any) => {
    return {
      on: {
        click: (event: any) => {
          this.$router.push({name: RouterNameEnum.SalonDetail, params: {id: record.id}})
        }
      }
    };
  }
  constructor() {
    super();
  }
  get FiltersStudio():FilterList[] {
    return [
      {
        key: 0,
        type: 'input',
        label: FiltersSalonsNameEnum.Partner,
        style: 'width:50px',
        defaultValue: 0,
        placeholder: '',
        filtered: false,
        fieldNames:['partner_id'],
        onChange(value: any) {
          //this.filtered=appFiltersStore.isFilter({source:'salons',key:'partner_id'})
          console.log('input ***'+value.target.value)
        },
        onSearch(value: any) {
        }
      },
      {
        key: 1,
        type: 'source',
        label: FiltersSalonsNameEnum.City,
        style: 'width:120px',
        defaultValue: 0,
        placeholder: 'уажите город',
        value:[],
        source:this.cities,
        fieldNames:['city_id'],
        storeSource:AppFilters.cities,
        filtered:false ,
        async onChange(value: any) {
          await appFiltersStore.setfilterSalons({city_id: value})
        },
        async onSearch(value: any) {
          await TerritoryStore.fetchAll({limit: 10, filter: {name: value}})
        }
      },
      {
        key: 2,
        type: 'source',
        label: FiltersSalonsNameEnum.Manager,
        style: 'width:120px',
        defaultValue: 0,
        placeholder: 'уажите город',
        value:[],
        source:this.managers,
        fieldNames:['escort_manager_id'],
        searchFieldName:'name',
        filtered:false,
        async onChange(value: any) {
          await appFiltersStore.setfilterSalons({escort_manager_id: value})
        },
        async onSearch(value: any) {
          await ManagerStore.fetchAll({limit: 10, filter: {name: value}})
        }
      },

      {
        key: 3,
        type: 'select',
        label: FiltersSalonsNameEnum.Active,
        style: 'width:100px',
        defaultValue: 0,
        placeholder: '',
        value:[{
          label: 'Не указано',
          key: '0'
        },
          {
            label: 'Активный',
            key: '1'
          },
          {
            label: 'Не активный',
            key: '2'
          }],
        fieldNames:['active'],
        filtered: false,
        async onChange(value: any) {
          let selector = value==='1'
          await appFiltersStore.setfilterSalons({active: selector})

        },
        onSearch(value: any) {
        }
      },
      {
        key: 4,
        type: 'date',
        label: FiltersSalonsNameEnum.OpeningDateTo,
        style: 'width:120px',
        defaultValue: 0,
        placeholder: '',
        value:[],
        fieldNames:['opening_date'],
        filtered: false,
        async onChange(value: any) {
          if (value) {
            let val: any = value;
            await appFiltersStore.setfilterSalons({opening_date: val.format('DD.MM.YYYY')})
            //this.filtered = appFiltersStore.isFilter({source:'salons',key:'opening_date'})
          } else
          {
            await appFiltersStore.clearfilterSalon({opening_date: ''})
          }
        },
        onSearch(value: any) {
        }
      },
      {
        key: 5,
        type: 'date',
        label: FiltersSalonsNameEnum.OpeningDateFrom,
        style: 'width:120px',
        defaultValue: 0,
        placeholder: '',
        value:[],
        fieldNames:['conclusion_contract_date'],
        filtered:false,
        async onChange(value: any) {
          if (value) {
            let val: any = value;
            await appFiltersStore.setfilterSalons({conclusion_contract_date: val.format('DD.MM.YYYY')})
          } else
          {
            await appFiltersStore.clearfilterSalon({conclusion_contract_date:''})
          }
        },
        onSearch(value: any) {
        }
      }
    ]
  }
  get columns(): ITableColumn[] {
    return TablesStore.salonsColumns;
  }
  async created(): Promise<void> {
    this.tableLoad = false

    await TerritoryStore.fetchCity({limit:this.AppPageParams.pageSize});
    await ManagerStore.fetchAll({limit:this.AppPageParams.pageSize});
    await PartnerStore.fetchAll({limit:this.AppPageParams.pageSize});
    this.formReady = true
    this.tableLoad = true
  }


}
</script>