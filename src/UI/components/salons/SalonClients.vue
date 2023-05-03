<template>
  <div>
    <template v-if="this.formReady">
      <div class="clients">

        <PageTitle>
          <template v-slot:default><span style="font-size: 24px;">Клиенты</span></template>
          <template v-slot:button>
            <a-dropdown placement="bottomRight">
              <a-button>Действия <a-icon type="down"></a-icon></a-button>
              <a-menu slot="overlay">
                <a-menu-item>
                  Отправить сообщение
                </a-menu-item>
                <a-menu-item>
                  Отправить Push в приложение
                </a-menu-item>
                <a-sub-menu key="test" title="Добавить в категорию">
                  <a-menu-item>menu item</a-menu-item>
                  <a-menu-item>menu item</a-menu-item>
                </a-sub-menu>
                <a-menu-item>
                  <span style="color: #FF4D4F;">Удалить</span>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
            <a-button icon="plus-circle" type="primary"
                      @click="$router.push({name: $routeRules.ClientCreation})">Создать клиента
            </a-button>
          </template>

        </PageTitle>
        <FiltersComponent :filters="filters">
          <template v-slot:search-start>
            <div>
              <div class="modal_label">
                Поиск по номеру/имени
              </div>
              <a-input-search @search="$emit('search')"/>
            </div>
          </template>
        </FiltersComponent>
        <a-table
            style="margin-top: 24px;"
            bordered
            :columns="columns"
            :data-source="clients.data"
            :pagination="AppPageParams"
            :loading="!this.tableLoad"
            :row-selection="{type:'checkbox'}"
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
import { Component } from "vue-property-decorator"
import PageTitle from "@/UI/components/common/PageTitle.vue"
import FiltersComponent from "@/UI/components/filter/FiltersComponent.vue"
import Filters from "@/entity/filters/filters"
import { IFilters } from "@/entity/filters/filters.types"
import { FiltersStore } from "@/store/modules/Filters"
import { ITableColumn } from "@/entity/table/table.types"
//import { TablesStore } from "@/store/modules/Tables"

import { mixins } from 'vue-class-component'
import { ClientsStore } from '@/store/modules/Clients'
import { DisplayMasks } from '@/UI/mixins/DisplayMasks'
import { FormMix } from '@/UI/mixins/FormMix'
import { PaginationMix } from '@/UI/mixins/PaginationMix'
import { ClientsMix } from '@/UI/mixins/ClientsMix'
import ClientLink from "@/UI/pages/clients/ClientLink.vue";
import {SalonsStore} from "@/store/modules/Salons";

//import { TableProps } from 'antd/lib/table';
@Component({
  components: { FiltersComponent, PageTitle, ClientLink }
})
export default class SalonClients extends mixins(FormMix, DisplayMasks, PaginationMix, ClientsMix) {
  filters: Filters
  loading = false
  searchText = ''
  searchedColumn = ''

  constructor() {
    super();
    this.filters = new Filters(this.filtersSalonClients);
  }
  get filtersSalonClients(): IFilters[] {
    return FiltersStore.filtersSalonClients;
  }

  get columns(): ITableColumn[] {
    return [
      {
        title:'',
        key:'id' ,
        dataIndex:'id'
      },

      {
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
        title: 'Продано',
        key: 'sold',
        dataIndex: 'sold', // todo test name
        sorter: (a: any, b: any) => a.sold.localeCompare(b.sold),

      },
      {
        title: 'Визиты',
        key: 'visited',
        dataIndex: 'visited', // todo test name
        sorter: (a: any, b: any) => a.visited.localeCompare(b.visited),

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

      }
    ]
  }

  /* get salonClientsColumns(): ITableColumn[] {
    return TablesStore.salonClientsColumns;
  } */

  /* get clients(): IClients | null {
    return ClientsStore.clients;
  }
  get clientsLoaded(): boolean {
    return ClientsStore.clientsLoaded;
  } */

  async created(): Promise<void> {
    await ClientsStore.fetchAll({limit: 10});
    this.AppPageParams.total = this.clients!.total
    this.tableLoad = true
    /* if (this.clients) {
       this.pagination.total = this.clients.total;
    } */
    this.formReady = true;
  }
  handleSearch(selectedKeys: any, confirm: any, dataIndex: any): void {
    confirm();
    this.searchText = selectedKeys[0];
    this.searchedColumn = dataIndex;
  }
  handleSearchLite(selectedKeys: any, confirm: any, dataIndex: any): void {
    this.searchText = selectedKeys[0];
    this.searchedColumn = dataIndex;
  }
  handleReset(clearFilters: any): void {
    clearFilters();
    this.searchText = '';
  }

  /* created(): void {
    for (let i = 0; i < 100; i++) {
      this.data.push({
        key: i + 1,
        name: 'Садыков Нияз',
        phone: '+7 999 999 09 99',
        sold: 128002,
        visit: '27',
        sale: '10%',
        dateLast: '21.07.2021, 17:20',
        dateNext: '21.07.2021, 18:20'
      })
    }
    this.pagination.total = this.data.length;
  } */
  async handleTableChange(pagination: any, filters: any, sorter: any) {
    this.tableLoad = false
    await ClientsStore.fetchAll({skip:this.calcSkip(pagination), limit:pagination.pageSize});
    this.tableLoad = true
  }
}
</script>

