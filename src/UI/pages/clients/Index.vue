<template>
  <div>
    <template v-if="this.formReady">
      <div class="clients">
        <div class="box-container">
          <PageTitle>
            <template v-slot:default>Клиенты</template>
            <template v-slot:button>
              <a-button icon="plus-circle" type="primary" size="large"
                        @click="$router.push({name: $routeRules.ClientCreation})">Создать клиента
              </a-button>
            </template>
          </PageTitle>
          <AppFilterTable :filters="FiltersClients" source="clients"/>
          <a-table
              style="margin-top: 24px;"
              bordered
              :columns="columns"
              :data-source="clients.data"
              :pagination="AppPageParams"
              :loading="!this.tableLoad"
              @change="handleTableChange"
          >
            <div
                slot="filterDropdown"
                slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
                style="padding: 2px; margin-top: -90px; opacity: inherit"
            >
              <a-input
                  v-ant-ref="c => (searchInput = c)"
                  :placeholder="`Поиск ${column.title}`"
                  :value="selectedKeys[0]"
                  @change="e => {setSelectedKeys(e.target.value ? [e.target.value] : []); handleSearchLite(selectedKeys, confirm, column.dataIndex)}"
                  @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
                  style="width: 120px; margin-bottom: 8px; display: inline;"
                  autofocus="1"
              />
              <a-button icon="close" size="small" style="width: 20px" @click="() => handleReset(clearFilters)"></a-button>
            </div>
            <a-icon
                slot="filterIcon"
                slot-scope="filtered"
                type="search"
                :style="{ color: filtered ? '#108ee9' : undefined }"
            />

            <template slot="name" slot-scope="text, record, index, column">
              <span v-if="searchText && searchedColumn === column.dataIndex">
                <template
                    v-for="(fragment, i) in text
                    .toString()
                    .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
                >
                  <mark
                      v-if="fragment.toLowerCase() === searchText.toLowerCase()"
                      :key="i"
                      class="highlight">

                    <ClientLink :caption="fragment"  :id="record.id"  />
                  </mark>
                  <template v-else>
                    <ClientLink :caption="fragment"  :id="record.id" />
                  </template>
                </template>
              </span>
              <template v-else>
                <ClientLink :caption="stringTruncate(text,20)"  :id="record.id" />
              </template>
            </template>
            <span slot="phone" style="font-size: small" slot-scope="text, record">
            <ClientLink :caption="NumberForPhone(text)" :id="record.id" />
          </span>
          </a-table>
        </div>
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

import { Component, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'

import PageTitle from "@/UI/components/common/PageTitle.vue";
import ClientLink from "@/UI/pages/clients/ClientLink.vue";
import {FiltersClientsNameEnum, FiltersSalonsNameEnum, IFilters} from "@/entity/filters/filters.types";
import { ITableColumn } from "@/entity/table/table.types";
import { ClientsStore } from '@/store/modules/Clients'
import { DisplayMasks } from '@/UI/mixins/DisplayMasks'
import { FormMix } from '@/UI/mixins/FormMix'
import { ClientsMix } from '@/UI/mixins/ClientsMix'

import { ProxyDataForm } from '@/UI/components/Helpers/ProxyDataForm'
import { appPaginationStore } from "@/store/modules/appPagination";
import { appFiltersStore } from "@/store/modules/appFilters";
import AppFilterTable from "@/UI/components/extFilter/AppFilterTable.vue";
import {FilterList} from "@/entity/filters/extFilter";

@Component({
  components: { PageTitle, ClientLink, AppFilterTable }
})


export default class Clients extends mixins( ProxyDataForm, DisplayMasks, FormMix,  ClientsMix ) {
  searchText = '';
  searchedColumn = '';
  searchInput: null;
  //formReady = false;

  //filters: Filters;

  //TODO::Add custom input on click Header
  /*customHeaderRow = (column: any)=> {
    return {
      on: {
        click: (event: any) => {
          console.log('Colum'+column)
          console.log('Event ' + event.target.parentNode.getElementsByClassName('HeaderSearchInput')[0])
          //className: "ant-table-column-title"
          if ((event.target.className=='ant-table-column-title') && (event.target.parentNode.getElementsByClassName('HeaderSearchInput')[0]==undefined)) {
             let SearchInputClass = Vue.extend(SearchInput)
             let Instance = new SearchInputClass({})
             Instance.$mount()
             event.target.parentNode.appendChild(Instance.$el);
          }

        }
      }
    };
  }*/
  constructor() {
    super();
    //this.filters = new Filters(this.filtersClients);
  }

  get FiltersClients():FilterList[] {
    return [
      {
        key: 0,
        type: 'select',
        label: FiltersClientsNameEnum.Sex,
        style: 'width:100px',
        defaultValue: 0,
        placeholder: '',
        value:[
          {
            label: 'Мужской',
            key: 1
          },
          {
            label: 'Женский',
            key: 2
          },
          {
            label: 'Неизвестно',
            key: 3
          }
        ],
        fieldNames:['sex'],
        filtered: false,
        async onChange(value: any) {
          await appFiltersStore.setfilterClients({sex: value})
        },
        onSearch(value: any) {
        }
      },

      {
        key: 2,
        type: 'input',
        label: FiltersClientsNameEnum.Sold,
        style: 'width:80px',
        defaultValue: 0,
        placeholder: '',
        value:[],
        source:[],
        fieldNames:['sold'],
        filtered:false,
        async onChange(value: any) {
          await appFiltersStore.setfilterClients({sold: value})
        },
        async onSearch(value: any) {
        }
      },
      {
        key: 3,
        type: 'input',
        label: FiltersClientsNameEnum.Visited,
        style: 'width:120px',
        defaultValue: 0,
        placeholder: 'визиты',
        value:[],
        source:[],
        fieldNames:['sold'],
        filtered:false,
        async onChange(value: any) {
          await appFiltersStore.setfilterClients({sold: value})
        },
        async onSearch(value: any) {
        }
      },
      {
        key: 4,
        type: 'input',
        label: FiltersClientsNameEnum.HaveNotes,
        style: 'width:60px',
        defaultValue: 0,
        placeholder: '',
        value:[],
        source:[],
        fieldNames:['sold'],
        filtered:false,
        async onChange(value: any) {
          await appFiltersStore.setfilterClients({havenotes: value})
        },
        async onSearch(value: any) {
        }
      },
      {
        key: 5,
        type: 'input',
        label: FiltersClientsNameEnum.NoHaveNotes,
        style: 'width:60px',
        defaultValue: 0,
        placeholder: '',
        value:[],
        source:[],
        fieldNames:['sold'],
        filtered:false,
        async onChange(value: any) {
          await appFiltersStore.setfilterClients({nohavenotes: value})
        },
        async onSearch(value: any) {
        }
      },
    ]

  }

  async created(): Promise<void> {

    this.tableLoad = false
    await ClientsStore.fetchAll({limit: this.AppPageParams.pageSize})

    this.formReady = true
    this.tableLoad = true
  }


  handleSearch(selectedKeys: any, confirm: any, dataIndex: any): void {
    confirm();
    this.searchText = selectedKeys[0];
    this.searchedColumn = dataIndex;
  }

  handleReset(clearFilters: any): void {
    clearFilters();
    this.searchText = '';
  }

  /*handleSearchLite(selectedKeys: any, confirm: any, dataIndex: any): void {
    this.searchText = selectedKeys[0];
    this.searchedColumn = dataIndex;
  }
  */
  get columns(): ITableColumn[] {
    //return TablesStore.clientsColumns;
    return [{
      title: 'Имя',
      key: 'name',
      dataIndex: 'name', // todo test name
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),

      scopedSlots: {
        filterDropdown: 'filterDropdown',
        filterIcon: 'filterIcon',
        customRender: 'name',
      },
      onFilter: (value:any, record:any) =>
          record.name
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible:any) => {
        /*if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0);
          }*/
      }
    },
      {
        title: 'Номер телефона',
        key: 'phone',
        dataIndex: 'phone',

        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'phone',
        },

        onFilter: (value:any, record:any) =>
            record.phone
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),

        onFilterDropdownVisibleChange: (visible:any) => {
          /*if (visible) {
            setTimeout(() => {

              this.searchInput.focus();
            }, 0);
          }*/
        }

      },
      {
        title: 'Посещений',
        key: 'visited',
        dataIndex: 'visited', // todo test name
        sorter: (a: any, b: any) => a.visited.localeCompare(b.visited),

      },
      {
        title: 'Продано',
        key: 'sold',
        dataIndex: 'sold', // todo test name
        sorter: (a: any, b: any) => a.sold.localeCompare(b.sold),

      },
      {
        title: 'Последний визит',
        key: 'last_visit',
        dataIndex: 'last_visit', // todo test name
        sorter: (a: any, b: any) => a.last_visit.localeCompare(b.last_visit),

      },
      {
        title: 'Дата регистрации',
        key: 'data_reg',
        dataIndex: 'data_reg', // todo test name
        sorter: (a: any, b: any) => a.data_reg.localeCompare(b.data_reg),

      },
      {
        title: 'Студия',
        key: 'salon_id',
        dataIndex: 'salon_id', // todo test name
        sorter: (a: any, b: any) => a.data_reg.localeCompare(b.data_reg),
      }


    ]
  }
}
</script>

