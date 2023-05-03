<template>
  <div class="clients">
      <PageTitle>
		<template v-slot:default><span style="font-size: 24px;">Общее</span></template>
      </PageTitle>
		<a-divider orientation="left">Абонементы</a-divider>
      <a-table
          style="margin-top: 24px;"
          bordered
          :columns="columns"
          :data-source="clients.data"
          :pagination="pagination"
          :loading="!clientsLoaded"
          :customRow="customRow"
      >
      </a-table>
		<a-divider orientation="left">Сертификаты</a-divider>
		<a-table
			style="margin-top: 24px;"
			bordered
			:columns="columns"
			:data-source="clients.data"
			:pagination="pagination"
			:loading="!clientsLoaded"
			:customRow="customRow"
		>
		</a-table>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import PageTitle from "@/UI/components/common/PageTitle.vue";
import {IClients} from "@/entity/clients/clients.types";
import {ITableColumn} from "@/entity/table/table.types";
import {TablesStore} from "@/store/modules/Tables";
import {ClientsStore} from "@/store/modules/Clients";

@Component({
  components: {PageTitle}
})
export default class Clients extends Vue {
  searchText = '';
  searchedColumn = '';
  pagination = {
    showSizeChanger: true,
    pageSize: 2,
    total: 500,
  }
  constructor() {
    super();
  }
  get clientsLoaded(): boolean {
    return ClientsStore.clientsLoaded;
  }
  get clients(): IClients | null {
    return ClientsStore.clients;
  }
  async created(): Promise<void> {
    // const token = localStorage.getItem('token');
    await ClientsStore.fetchAll({limit: 10});
    if (this.clients) {
      this.pagination.total = this.clients.total;
    }
  }
 get columns(): ITableColumn[] {
    return TablesStore.clientsLoyaltyColumns;
  }
}
</script>
<style lang="scss" scoped>
</style>
