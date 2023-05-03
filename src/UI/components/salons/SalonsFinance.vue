<template>
  <div>
    <PageTitle>
      <template v-slot:default><span style="font-size: 24px;">Финансы</span></template>
      <template v-slot:button>
        <div class="title-sum">
          <span class="total">Итого</span>
          <span class="sum">50 750 руб.</span>
        </div>
      </template>
    </PageTitle>
    <FiltersComponent :filters="filters">
      <template v-slot:search-end>
        <div>
          <div class="modal_label">
            Поиск по номеру клиента
          </div>
          <a-input-search @search="$emit('search')"/>
        </div>
      </template>
    </FiltersComponent>
    <a-table
        style="margin-top: 24px;"
        bordered
        :columns="salonFinancesColumns"
        :data-source="data"
        :pagination="pagination"
        :loading="loading"
    />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import PageTitle from "@/UI/components/common/PageTitle.vue";
import FiltersComponent from "@/UI/components/filter/FiltersComponent.vue";
import Filters from "@/entity/filters/filters";
import {IFilters} from "@/entity/filters/filters.types";
import {FiltersStore} from "@/store/modules/Filters";
import {ITableColumn} from "@/entity/table/table.types";
import {TablesStore} from "@/store/modules/Tables";
@Component({
  components: {FiltersComponent, PageTitle}
})
export default class SalonsFinance extends Vue {
  filters: Filters;
  loading = false;
  data: any[] = [];
  pagination = {
    showSizeChanger: true,
    pageSize: 10,
    total: 500,
  }
  constructor() {
    super();
    this.filters = new Filters(this.filtersFinance);
  }
  get filtersFinance(): IFilters[] {
    return FiltersStore.filtersSalonFinances;
  }
  get salonFinancesColumns(): ITableColumn[] {
    return TablesStore.salonFinancesColumns;
  }
  created(): void {
    for (let i = 0; i < 100; i++) {
      this.data.push({
        key: (i + 1).toString(),
        date: '21.07.2021, 17:20',
        payer: 'Алина Матвеева',
        purpose: 'Оказание услуг',
        kassa: 'Наличные',
        sum: 10700,
        service: 'Глубокое бикини',
        visit: '21.07.2021, 18:20'
      })
    }
    this.pagination.total = this.data.length;
  }
}
</script>

<style lang="scss" scoped>
.title-sum {
  display: flex;
  flex-direction: row;
  font-size: 16px;
  .total {
    display: flex;
    background: #D9D9D9;
    font-weight: 600;
    padding: 8px 16px;
  }
  .sum {
    font-weight: 300;
    color: #262626;
    padding: 8px 16px;
  }
}
</style>